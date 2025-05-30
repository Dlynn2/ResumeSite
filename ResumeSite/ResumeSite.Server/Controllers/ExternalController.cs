using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using ResumeSite.Server.DTO;
using System.Globalization;

namespace ResumeSite.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExternalController : Controller
    {
        private readonly ILogger<ExternalController> _logger;

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        public ExternalController(ILogger<ExternalController> logger, IHttpClientFactory httpClientFactory, IMemoryCache cache)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
            _cache = cache;
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
            _logger.LogInformation("getting astrology photo of the day for day ");
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Get,url){};
            HttpClient client = _httpClientFactory.CreateClient();
            var response = await client.SendAsync(httpRequestMessage);
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
    }
}
