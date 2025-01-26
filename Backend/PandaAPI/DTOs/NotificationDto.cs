using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class NotificationDto
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public DateTime DateTime { get; set; }
    public string img { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public bool isReade { get; set; }
}

public static class NotificationExtensions
{
    public static NotificationDto ToDto(this Notification n)
    {
        return new NotificationDto()
        {
            Id = n.Id,
            UserId = n.UserId,
            DateTime = n.DateTime,
            img = n.img,
            Name = n.Name,
            Title = n.Title,
            Content = n.Content,
            isReade = true,
        };
    }
}
