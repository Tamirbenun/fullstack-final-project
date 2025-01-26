using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class CreateNewsletterDto
{
    [Required(ErrorMessage = "Email is required.")]
    [MinLength(5, ErrorMessage = "Email must be at least 5 characters long.")]
    [MaxLength(20, ErrorMessage = "Email must not exceed 20 characters.")]
    public string Email { get; set; }

    [Required(ErrorMessage = "JoiningDate is required.")]
    public required DateTime JoiningDate { get; set; }
}

public static class CreateNewsletterDtoExtensions
{
    public static Newsletter ToNewsletter(this CreateNewsletterDto dto)
    {
        return new Newsletter
        {
            Email = dto.Email,
            JoiningDate = dto.JoiningDate,
        };
    }
}
