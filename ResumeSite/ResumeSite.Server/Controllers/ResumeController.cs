namespace ResumeSite.Server.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class ResumeController : Controller
    {
        private readonly ILogger<ResumeController> _logger;


        private readonly IConfiguration _configuration;

        public ResumeController(ILogger<ResumeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        // GET: BlobController
        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            ActionResult result = null;
            return Task.FromResult(result).Result;
        }
    }
}
