using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class UpdateUserDto
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

    [DataType(DataType.Password)]
    [MinLength(6), MaxLength(20)]
    public string? Password { get; set; }

}

public static class UpdateUserDtoExtensions
{
    public static User ToUser(this UpdateUserDto dto)
    {
        return new User
        {
            UserName = dto.UserName.ToLower(),
            NormalizedUserName = dto.UserName.ToUpper(),
            Email = dto.Email.ToLower(),
            NormalizedEmail = dto.Email.ToUpper(),
            Image = dto.Image,
        };
    }
}
