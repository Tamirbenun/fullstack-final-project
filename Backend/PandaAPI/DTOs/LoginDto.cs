using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class LoginDto
{
    [Required]
    [EmailAddress]
    [MinLength(5), MaxLength(30)]
    public required string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [MinLength(6), MaxLength(20)]
    public required string Password { get; set; }
}
