using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class NewsletterController(NewsletterRepository repository) : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles = "admin")]
        public ActionResult GetNewslatterEmails()
        {
            var Emails = repository.GetAll();

            if (Emails is null)
            {
                return NotFound("No Emails found");
            }

            return Ok(Emails);
        }

        [HttpGet("{email}")]
        public ActionResult GetNewsletterEmail([FromRoute] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var emailLowerCase = email.ToLower();
            var emailRecord = repository.GetByEmail(emailLowerCase);

            if (emailRecord is null)
            {
                return NotFound("Email not found.");
            }

            return Ok(emailRecord);
        }


        [HttpPost]
        public ActionResult AddNewsletterEmail([FromBody] CreateNewsletterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingEmail = repository.GetByEmail(dto.Email.ToLower());
            if (existingEmail != null)
            {
                return Conflict("Email is already subscribed to the newsletter.");
            }

            var newsletter = dto.ToNewsletter();

            try
            {
                repository.Add(newsletter);
                return CreatedAtAction(
                    nameof(GetNewsletterEmail),
                    new { email = newsletter.Email, joiningDate = newsletter.JoiningDate  },
                    newsletter.ToDto()
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the email.");
            }
        }



        [HttpDelete("{email}")]
        public ActionResult DeleteNewslatterEmail([FromRoute] string email)
        {
            var emailRecord = repository.GetByEmail(email.ToLower());

            if (emailRecord is null)
            {
                return NotFound($"{email} not found");
            }

            repository.Delete(emailRecord);
            return Ok($"{email} successfully deleted");
        }
    }
}
