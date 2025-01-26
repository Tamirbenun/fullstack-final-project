using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class UpdateNotificationDto
{
    public bool isReade { get; set; }
}

public static class UpdateNotificationDtoExtensions
{
    public static Notification ToNotification(this UpdateNotificationDto dto)
    {
        return new Notification
        {
            isReade = dto.isReade,
        };
    }
}
