namespace ResumeSite.Server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using ResumeSite.Server.DTO;
    using SendGrid;
    using SendGrid.Helpers.Mail;

    [ApiController]
    [Route("[controller]")]
    public class EmailController : Controller
    {
        private readonly ILogger<EmailController> _logger;

        private readonly IConfiguration _configuration;

        public EmailController(ILogger<EmailController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<bool> PostAsync([FromBody] EmailRequest req)
        {
            var apiKey = _configuration.GetValue<string>(Constants.SendGridKey);
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(_configuration.GetValue<string>(Constants.emailFrom), req.EmailFrom);
            var subject = req.EmailSubject;
            var to = new EmailAddress(_configuration.GetValue<string>(Constants.emailTo), Constants.Dylan);
            var plainTextContent = req.EmailBody;
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return response.IsSuccessStatusCode;

        }
    }
}
