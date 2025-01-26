using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PandaAPI.Services;

public class JwtService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<User> _userManager;

    public JwtService(IConfiguration configuration, UserManager<User> userManager)
    {
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
    }

    public async Task<string> CreateToken(User user)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["SecretKey"] ?? throw new Exception("Secret Key Must be in appsettings.json");

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),
            new Claim("img", user.Image)
        };

        var isAdmin = await _userManager.IsInRoleAsync(user, "admin");

        if (isAdmin)
        {
            claims.Add(new Claim(ClaimTypes.Role, "admin"));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        JwtSecurityToken token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}
