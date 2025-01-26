using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

public class EmailService
{
    private readonly EmailSettings _emailSettings;

    public EmailService(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    public void SendEmail(string recipientEmail, string subject, string name, string email, string messageContent)
    {
        try
        {
            var smtpClient = new SmtpClient(_emailSettings.SmtpServer)
            {
                Port = _emailSettings.Port,
                Credentials = new NetworkCredential(_emailSettings.SenderEmail, _emailSettings.AppPassword),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail, "AirPanda Contact Form"),
                Subject = subject,
                Body = CreateEmailBody(name, email, subject, messageContent),
                IsBodyHtml = true
            };

            mailMessage.To.Add(recipientEmail);

            smtpClient.Send(mailMessage);
        }
        catch (Exception ex)
        {
            throw new Exception($"Email sending failed: {ex.Message}");
        }
    }

    private string CreateEmailBody(string name, string email, string subject, string message)
    {
        return $@"
            <!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Contact Form Submission</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f8fc;
        }}
        .email-container {{
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #d6e9f8;
        }}
        .email-header {{
            background-color: #0056b3;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }}
        .email-header h1 {{
            margin: 0;
            font-size: 24px;
        }}
        .email-body {{
            padding: 20px;
            color: #333333;
        }}
        .email-body h2 {{
            margin-top: 0;
            color: #0056b3;
        }}
        .email-body p {{
            line-height: 1.6;
            margin-bottom: 15px;
        }}
        .email-footer {{
            text-align: center;
            padding: 20px;
            background-color: #f9fbfe;
            color: #555555;
            font-size: 12px;
        }}
        .info-label {{
            font-weight: bold;
            color: #0056b3;
        }}
        .info-value {{
            color: #333333;
        }}
      .email-footer p {{
      margin-bottom: 0;
      }}
    </style>
</head>
<body>
    <div class=""email-container"">
                    <div class=""email-header"">
           <h1>New Message Received</h1>
        </div>

                    <div class=""email-body"">
            <p><span class=""info-label"">Name:</span> <span class=""info-value"">{name}</span></p>
            <p><span class=""info-label"">Email:</span> <span class=""info-value"">{email}</span></p>
            <p><span class=""info-label"">Subject:</span> <span class=""info-value"">{subject}</span></p>
            <p><span class=""info-label"">Message:</span></p>
            <p class=""info-value"">{message}</p>
        </div>

        <div class=""email-footer"">
            <p>© 2025 Your Website. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        ";
    }
}
