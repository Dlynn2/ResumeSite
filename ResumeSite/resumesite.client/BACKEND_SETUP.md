# Backend Setup for Contact Form

## 1. Create the Contact Model

Create a new file in your .NET backend: `Models/ContactRequest.cs`

```csharp
namespace ResumeSite.Server.Models
{
    public class ContactRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
```

## 2. Create the Contact Controller

Create a new file: `Controllers/ContactController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using ResumeSite.Server.Models;
using System.Net;
using System.Net.Mail;

namespace ResumeSite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IConfiguration configuration, ILogger<ContactController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendContactEmail([FromBody] ContactRequest request)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(request.Name) ||
                    string.IsNullOrWhiteSpace(request.Email) ||
                    string.IsNullOrWhiteSpace(request.Message))
                {
                    return BadRequest(new { error = "All fields are required" });
                }

                // Get email configuration from appsettings.json
                var smtpHost = _configuration["Email:SmtpHost"];
                var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
                var smtpUser = _configuration["Email:SmtpUser"];
                var smtpPassword = _configuration["Email:SmtpPassword"];
                var toEmail = _configuration["Email:ToEmail"] ?? "Dlynn237@gmail.com";

                // Create email message
                using var mailMessage = new MailMessage
                {
                    From = new MailAddress(smtpUser!, "Resume Site Contact Form"),
                    Subject = $"New Contact Form Submission from {request.Name}",
                    Body = $@"
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> {request.Name}</p>
                        <p><strong>Email:</strong> {request.Email}</p>
                        <p><strong>Message:</strong></p>
                        <p>{request.Message.Replace("\n", "<br>")}</p>
                    ",
                    IsBodyHtml = true
                };

                mailMessage.To.Add(toEmail);
                mailMessage.ReplyToList.Add(request.Email);

                // Send email
                using var smtpClient = new SmtpClient(smtpHost, smtpPort)
                {
                    Credentials = new NetworkCredential(smtpUser, smtpPassword),
                    EnableSsl = true
                };

                await smtpClient.SendMailAsync(mailMessage);

                _logger.LogInformation("Contact form email sent successfully from {Email}", request.Email);

                return Ok(new { message = "Email sent successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending contact form email");
                return StatusCode(500, new { error = "Failed to send email" });
            }
        }
    }
}
```

## 3. Update appsettings.json

Add email configuration to your `appsettings.json`:

```json
{
  "Email": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-app-password",
    "ToEmail": "Dlynn237@gmail.com"
  }
}
```

**Important for Gmail:**
- You need to use an App Password, not your regular Gmail password
- Enable 2-factor authentication in your Google account
- Go to Google Account > Security > 2-Step Verification > App Passwords
- Generate an app password for "Mail" and use that in appsettings.json

## 4. Alternative: Use a Third-Party Service

Instead of SMTP, you can use services like:

### **SendGrid** (Recommended - Free tier: 100 emails/day)

```bash
dotnet add package SendGrid
```

```csharp
using SendGrid;
using SendGrid.Helpers.Mail;

[HttpPost]
public async Task<IActionResult> SendContactEmail([FromBody] ContactRequest request)
{
    try
    {
        var apiKey = _configuration["SendGrid:ApiKey"];
        var client = new SendGridClient(apiKey);
        
        var from = new EmailAddress("noreply@yourdomain.com", "Resume Site");
        var to = new EmailAddress("Dlynn237@gmail.com", "Dylan Lynn");
        var subject = $"New Contact: {request.Name}";
        var plainTextContent = request.Message;
        var htmlContent = $@"
            <strong>From:</strong> {request.Name} ({request.Email})<br>
            <strong>Message:</strong><br>{request.Message.Replace("\n", "<br>")}
        ";
        
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        msg.ReplyTo = new EmailAddress(request.Email, request.Name);
        
        var response = await client.SendEmailAsync(msg);
        
        if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
        {
            return Ok(new { message = "Email sent successfully" });
        }
        
        return StatusCode(500, new { error = "Failed to send email" });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error sending email via SendGrid");
        return StatusCode(500, new { error = "Failed to send email" });
    }
}
```

appsettings.json:
```json
{
  "SendGrid": {
    "ApiKey": "your-sendgrid-api-key"
  }
}
```

## 5. Alternative: Client-Side Only (No Backend)

If you don't want to set up backend email, you can use **Formspree** or **EmailJS**:

### **EmailJS** (Free tier: 200 emails/month)

```bash
npm install @emailjs/browser
```

Update Contact.tsx:
```typescript
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    
    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  } catch (err) {
    setError('Failed to send message');
  } finally {
    setLoading(false);
  }
};
```

## 6. Security Considerations

For production:
- Add rate limiting to prevent spam
- Add CAPTCHA (Google reCAPTCHA)
- Validate and sanitize all inputs
- Use environment variables for sensitive data
- Add CORS configuration if needed
