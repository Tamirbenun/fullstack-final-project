using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class RegisterDto
{
    [Required]
    [MinLength(2), MaxLength(20)]
    public required string UserName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Adress")]
    [MinLength(7), MaxLength(50)]
    public required string Email { get; set; }

    [Required]
    public required string Image { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [MinLength(6), MaxLength(20)]
    public required string Password { get; set; }
}

public static class RegisterDtoExtensions
{
    public static User ToUser(this RegisterDto dto)
    {
        return new User
        {
            Id = Guid.NewGuid().ToString(),
            UserName = dto.UserName,
            Email = dto.Email,
            Image = dto.Image,
        };
    }
}