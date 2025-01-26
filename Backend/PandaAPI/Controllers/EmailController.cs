using Microsoft.AspNetCore.Mvc;

namespace PandaAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send")]
    public IActionResult SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            _emailService.SendEmail(
                recipientEmail: "airpanda.airline@gmail.com",
                subject: request.Subject,
                name: request.Name,
                email: request.Email,
                messageContent: request.Message
            );

            return Ok(new { message = "Email sent successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}

public class EmailRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}
