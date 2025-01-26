using DAL.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PandaAPI.DTOs;

public class CreateNotificationDto
{
    [Required(ErrorMessage = "User ID is required.")]
    public required string UserId { get; set; }

    [Required(ErrorMessage = "Date and Time is required.")]
    public required DateTime DateTime { get; set; }

    [Required(ErrorMessage = "Image is required.")]
    public required string img { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    public required string Title { get; set; }

    [Required(ErrorMessage = "Content is required.")]
    public required string Content { get; set; }

    public bool isReade { get; set; }
}

public static class CreateNotificationDtoExtensions
{
    public static Notification ToNotification(this CreateNotificationDto dto)
    {
        return new Notification
        {
            UserId = dto.UserId,
            DateTime = dto.DateTime,
            img = dto.img,
            Name = dto.Name,
            Title = dto.Title,
            Content = dto.Content,
            isReade = true,
        };
    }
}
