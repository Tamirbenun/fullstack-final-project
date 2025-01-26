using Microsoft.AspNetCore.Identity;

namespace DAL.Models;

public class User : IdentityUser<string> 
{
    public string Image { get; set; }
}
