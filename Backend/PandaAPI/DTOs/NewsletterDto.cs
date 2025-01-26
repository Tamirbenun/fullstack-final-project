using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class NewsletterDto
{
    public string Email { get; set; }
    public DateTime JoiningDate { get; set; }
}

public static class NewslatterExtensions
{
    public static NewsletterDto ToDto(this Newsletter n)
    {
        return new NewsletterDto()
        {
            Email = n.Email,
            JoiningDate = n.JoiningDate,
        };
    }
}
