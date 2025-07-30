using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using ResumeSite.Server.Data;
using ResumeSite.Server.Data.Models;
using ResumeSite.Server.DTO;
using ResumeSite.Server.DTO.ResumeSite.Server.DTO;
using System.Globalization;
using UAParser;

namespace ResumeSite.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExternalController : Controller
    {
        private readonly ILogger<ExternalController> _logger;

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ResumeDbContext _dbContext;
        public ExternalController(ILogger<ExternalController> logger,
            IHttpClientFactory httpClientFactory,
            IMemoryCache cache,
            IConfiguration configuration,
            ResumeDbContext context)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _cache = cache;
            _httpClient = _httpClientFactory.CreateClient();
            _configuration = configuration;
            _dbContext = context;
        }

        [HttpGet]
        public async Task<ApodDto?> Get(DateTime apodDate)
        {
            string cacheKey = $"apod_{apodDate:yyyyMMdd}";
            if (_cache.TryGetValue(cacheKey, out ApodDto cachedApod))
            {
                return cachedApod;
            }
            ApodDto? apodDtoResponse = null;
            string url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + apodDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url) { };
            var response = await _httpClient.SendAsync(httpRequestMessage);
            if (response.IsSuccessStatusCode)
            {
                apodDtoResponse = JsonConvert.DeserializeObject<ApodDto>(await response.Content.ReadAsStringAsync());
                if (apodDtoResponse != null)
                {

                    var now = DateTime.Now;
                    var midnight = now.Date.AddDays(1);
                    var cacheEntryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = midnight
                    };
                    _cache.Set(cacheKey, apodDtoResponse, cacheEntryOptions);
                }
            }
            return apodDtoResponse;
        }

        [HttpGet]
        [Route("IpInfo")]
        public async Task<IActionResult> GetIpInfo([FromQuery] string ip)
        {
            if (string.IsNullOrWhiteSpace(ip))
                return BadRequest("IP address is required.");

            var ipInfoTask = GetIpInfoInternal(ip);
            var weatherInfoTask = GetWeatherInfoInternal(ip);

            await Task.WhenAll(ipInfoTask, weatherInfoTask);

            var ipInfo = ipInfoTask.Result;
            var weatherInfo = weatherInfoTask.Result;
            var userAgentString = Request.Headers["User-Agent"].ToString();
            var uaParser = Parser.GetDefault();
            ClientInfo clientInfo = uaParser.Parse(userAgentString);

            UserInfo userInfo = new UserInfo
            {
                IpAddress = ip,
                CityName = ipInfo?.City,
                CountryName = ipInfo?.Country_Name,
                Weather = weatherInfo?.Current?.Temperature.ToString() ?? "N/A",
                VistedAt = DateTime.UtcNow,
                HostName = ipInfo?.Hostname ?? "N/A",
                UserAgent = Request.Headers["User-Agent"].ToString() ?? "N/A",
                Browser = $"{clientInfo.UA.Family} {clientInfo.UA.Major}",
                OperatingSystem = $"{clientInfo.OS.Family} {clientInfo.OS.Major}",
                DeviceType = clientInfo.Device.Family,
                RegionName = ipInfo?.Region_Name ?? "N/A"
            };
            _dbContext.Add(userInfo);
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving user info to database.");
            }
            _cache.Remove("analytics");
            return Ok(new { IpInfo = ipInfo, WeatherInfo = weatherInfo });
        }

        private async Task<IpInfoDto?> GetIpInfoInternal(string ip)
        {
            string? apiKey = _configuration.GetValue<string>(Constants.IpStackKey);
            string url = $"https://api.ipstack.com/{ip}?access_key={apiKey}";

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<IpInfoDto>(json);
            }
            return null;
        }

        private async Task<WeatherInfoDto?> GetWeatherInfoInternal(string ip)
        {
            string? apiKey = _configuration.GetValue<string>(Constants.WeatherStackKey);
            string url = $"http://api.weatherstack.com/current?access_key={apiKey}&query={ip}&units=f";

            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, url);
            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<WeatherInfoDto>(json);
            }
            return null;
        }

        
        public class SpotifyAuthRequest
        {
            public string Code { get; set; }
        }
    }
}
