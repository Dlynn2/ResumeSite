namespace ResumeSiteApi.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class ContactController : Controller
    {
        private readonly ILogger<ContactController> _logger;

        public ContactController(ILogger<ContactController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IEnumerable<WeatherForecast> Email()
        {
            return null;   
        }
    }
}
