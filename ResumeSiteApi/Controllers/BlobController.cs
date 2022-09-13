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

        // GET: BlobController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: BlobController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BlobController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BlobController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: BlobController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: BlobController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: BlobController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
