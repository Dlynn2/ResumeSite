using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ResumeSiteApi.DTO;
using System.Globalization;

namespace ResumeSiteApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExternalController : Controller
    {
        private readonly ILogger<ExternalController> _logger;

        private readonly IHttpClientFactory _httpClientFactory;

        public ExternalController(ILogger<ExternalController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<ApodDto> Get(DateTime apodDate)
        {
            ApodDto apodDtoResponse = new ApodDto();
            string url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=" + apodDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture);
            _logger.LogInformation("getting astrology photo of the day for day ");
            var httpRequestMessage = new HttpRequestMessage(
            HttpMethod.Get,
            url)
            {
            };
            HttpClient client = _httpClientFactory.CreateClient();
            var response = await client.SendAsync(httpRequestMessage);
            if (response.IsSuccessStatusCode)
            {
                apodDtoResponse = JsonConvert.DeserializeObject<ApodDto>(await response.Content.ReadAsStringAsync());
            }
            return apodDtoResponse;
        }
    }
}
