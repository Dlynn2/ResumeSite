namespace ResumeSiteApi.Controllers
{
    using Azure.Storage.Blobs;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("[controller]")]
    public class BlobController : Controller
    {
        private readonly ILogger<BlobController> _logger;

        private readonly BlobServiceClient _blobServiceClient;

        public BlobController(ILogger<BlobController> logger, BlobServiceClient blobServiceClient)
        {
            _logger = logger;
            _blobServiceClient = blobServiceClient;
        }
        // GET: BlobController
        [HttpGet]
        public ActionResult Get()
        {
            return View();
        }
    }
}
