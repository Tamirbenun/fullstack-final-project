using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class NotificationsController(NotificationsRepository repository) : ControllerBase
{
    [HttpGet("UserId/{userId}")]
    [Authorize]
    public ActionResult<IEnumerable<Notification>> GetNotificationsByUserId(string userId)
    {
        var notifications = repository.FindByUserId(userId);

        if (notifications is null || !notifications.Any())
        {
            return NotFound("No Notifications found with this user");
        }
        return Ok(notifications);
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public ActionResult AddNotification([FromBody] CreateNotificationDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var notification = dto.ToNotification();

        try
        {
            repository.Add(notification);

            return Ok(notification);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while saving the notification.");
        }
    }

    [HttpPatch("{id}")]
    [Authorize]
    public ActionResult UpdateIsRead(string id, [FromBody] UpdateNotificationDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var notification = repository.GetById(id);

        if (notification == null)
        {
            return NotFound("Notification not found");
        }

        try
        {
            notification.isReade = dto.isReade;

            repository.Update(notification);

            return Ok("Notification updated successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while updating the notification.");
        }
    }



    [HttpDelete("{id}")]
    [Authorize]
    public ActionResult DeleteNotificationById(string id)
    {
        var notification = repository.GetById(id);

        if (notification is null)
        {
            return NotFound("No Notification found with this ID");
        }
        repository.Delete(notification);
        return Ok("Notification successfully deleted");
    }
}
