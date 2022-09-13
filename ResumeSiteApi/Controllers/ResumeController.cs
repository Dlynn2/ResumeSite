namespace ResumeSiteApi.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class ResumeController : Controller
    {
        private readonly ILogger<ResumeController> _logger;

        private readonly BlobServiceClient _blobServiceClient;

        private readonly IConfiguration _configuration;

        public ResumeController(ILogger<ResumeController> logger, BlobServiceClient blobServiceClient, IConfiguration configuration)
        {
            _logger = logger;
            _blobServiceClient = blobServiceClient;
            _configuration = configuration;
        }
        // GET: BlobController
        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            ActionResult result = null;
            var blobContainer = _blobServiceClient.GetBlobContainerClient(_configuration.GetValue<string>(Constants.resumeBlobConnection));
            //var blobs = blobContainer.UploadBlobAsync().;
            return Task.FromResult(result).Result;
        }
    }
}
