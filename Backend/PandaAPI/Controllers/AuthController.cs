using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;
using PandaAPI.Services;
using System.Collections.Generic;
using System.Security.Claims;

namespace PandaAPI.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class AuthController(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        RoleManager<IdentityRole<string>> roleManager,
        JwtService jwtService
        ) : ControllerBase
{

    [HttpPost("Register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto dto)
    {
        if (ModelState.IsValid)
        {
            var result = await userManager.CreateAsync(dto.ToUser(), dto.Password);

            if (result.Succeeded)
            {
                return Ok("Registration has been successfully completed");
            }
            return BadRequest(result.Errors);
        }
        return BadRequest(ModelState);
    }

    [HttpPost("Login")]
    public async Task<ActionResult> Login([FromBody] LoginDto dto)
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user is null || user.UserName is null)
            {
                return Unauthorized();
            }

            var result = await signInManager.PasswordSignInAsync(
                user.UserName, dto.Password, false, false);

            if (result.Succeeded)
            {
                var token = await jwtService.CreateToken(user);
                return Ok(new { token });
            }

            return Unauthorized();
        }
        return BadRequest(ModelState);
    }

    [HttpPost("AdminLogin")]
    public async Task<ActionResult> AdminLogin([FromBody] LoginDto dto)
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user is null || user.UserName is null)
            {
                return Unauthorized();
            }

            var result = await signInManager.PasswordSignInAsync(
                user.UserName, dto.Password, false, false);

            if (result.Succeeded)
            {
                var isAdmin = await userManager.IsInRoleAsync(user, "Admin");

                if (isAdmin)
                {
                    var token = await jwtService.CreateToken(user);
                    return Ok(new { token });
                }

                return Forbid();
            }

            return Unauthorized();
        }
        return BadRequest(ModelState);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> UpdateUserAdmin(string id, UpdateUserDto dto, string role = null)
{
    var user = await userManager.FindByIdAsync(id);
    if (user is null)
    {
        return NotFound($"No user found with ID: {id}");
    }

    user.UserName = dto.UserName?.ToLower() ?? user.UserName;
    user.NormalizedUserName = dto.UserName?.ToUpper() ?? user.NormalizedUserName;
    user.Email = dto.Email?.ToLower() ?? user.Email;
    user.NormalizedEmail = dto.Email?.ToUpper() ?? user.NormalizedEmail;
    user.Image = dto.Image ?? user.Image;

    if (!string.IsNullOrEmpty(dto.Password))
    {
        var hasher = new PasswordHasher<User>();
        user.SecurityStamp = Guid.NewGuid().ToString();
        user.PasswordHash = hasher.HashPassword(null, dto.Password);
    }

    if (!string.IsNullOrEmpty(role))
    {
        var existingRoles = await userManager.GetRolesAsync(user);

        if (existingRoles.Any())
        {
            var removeRolesResult = await userManager.RemoveFromRolesAsync(user, existingRoles);
            if (!removeRolesResult.Succeeded)
            {
                return BadRequest($"Failed to remove existing roles: {string.Join(", ", removeRolesResult.Errors.Select(e => e.Description))}");
            }
        }

        if (role == "admin")
          {
            var addRoleResult = await userManager.AddToRoleAsync(user, role);
            if (!addRoleResult.Succeeded)
            {
                return BadRequest($"Failed to add role {role}: {string.Join(", ", addRoleResult.Errors.Select(e => e.Description))}");
            }
        }
    }

    var result = await userManager.UpdateAsync(user);
    if (result.Succeeded)
    {
        return NoContent();
    }

    return BadRequest(result.Errors);
}

    [HttpPut("User/{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateUser(string id, UpdateUserDto dto)
    {
        var userIdFromToken = User.FindFirst("jti")?.Value;

        if (userIdFromToken != id)
        {
            return Forbid("You are not authorized to update this user.");
        }

        var user = await userManager.FindByIdAsync(id);
        if (user is null)
        {
            return NotFound($"No user found with ID: {id}");
        }

        user.UserName = dto.UserName?.ToLower() ?? user.UserName;
        user.NormalizedUserName = dto.UserName?.ToUpper() ?? user.NormalizedUserName;
        user.Email = dto.Email?.ToLower() ?? user.Email;
        user.NormalizedEmail = dto.Email?.ToUpper() ?? user.NormalizedEmail;
        user.Image = dto.Image ?? user.Image;

        if (!string.IsNullOrEmpty(dto.Password))
        {
            var hasher = new PasswordHasher<User>();
            user.SecurityStamp = Guid.NewGuid().ToString();
            user.PasswordHash = hasher.HashPassword(null, dto.Password);
        }

        var result = await userManager.UpdateAsync(user);
        if (result.Succeeded)
        {
            return NoContent();
        }

        return BadRequest(result.Errors);
    }


    [HttpGet("Users")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = userManager.Users.ToList();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                Console.WriteLine($"User: {user.UserName}, Roles: {string.Join(", ", roles)}");

                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Image = user.Image,
                    Role = roles.FirstOrDefault() ?? "member",
                });
            }

            return Ok(userDtos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }




    [HttpGet("User/{id}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUserById(string id)
    {
        try
        {
            var user = await userManager.FindByIdAsync(id);

            if (user is null)
            {
                return NotFound($"No user found with ID: {id}");
            }

            var roles = await userManager.GetRolesAsync(user);

            var userDto = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Image = user.Image,
                Role = roles.FirstOrDefault() ?? "member"
            };

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


    [HttpDelete("User/{id}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult> DeleteUser(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null)
        {
            return NotFound($"No user found with ID: {id}");
        }

        try
        {
            var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                var removeRoleResult = await userManager.RemoveFromRoleAsync(user, role);
                if (!removeRoleResult.Succeeded)
                {
                    return BadRequest($"Failed to remove role {role} from user.");
                }
            }

            var deleteResult = await userManager.DeleteAsync(user);
            if (deleteResult.Succeeded)
            {
                return NoContent();
            }

            return BadRequest(deleteResult.Errors);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}
