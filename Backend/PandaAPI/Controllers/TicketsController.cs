using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class TicketsController(TicketsRepository repository, FlightsRepository flightsRepository) : ControllerBase
{
    [HttpGet("{id}")]
    [Authorize]
    public ActionResult GetTicketById(string id)
    {
        var ticket = repository.GetById(id);

        if (ticket is null)
        {
            return NotFound("No ticket found for this ID");
        }
        return Ok(ticket.ToDto());
    }

    [HttpGet("UserId/{userId}")]
    [Authorize]
    public ActionResult<IEnumerable<Ticket>> GetTicketsByUserId(string userId)
    {
        var tickets = repository.FindByUserId(userId);

        if (tickets is null || !tickets.Any())
        {
            return NotFound("No tickets found with this user");
        }
        return Ok(tickets);
    }

    [HttpPost]
    [Authorize]
    public ActionResult AddTickets(List<CreateTicketDto> dtos)
    {
        if (ModelState.IsValid)
        {
            var createdTickets = new List<TicketDto>();

            foreach (var dto in dtos)
            {
                var ticket = dto.ToTicket();
                repository.Add(ticket);
                createdTickets.Add(ticket.ToDto());
            }

            return Created(string.Empty, createdTickets);
        }
        return BadRequest(ModelState);
    }

    [HttpDelete("{ticketId}")]
    [Authorize(Roles = "admin")]
    public ActionResult DeleteTicketById(string ticketId)
    {
        var ticket = repository.GetById(ticketId);

        if (ticket is null)
        {
            return NotFound("No Ticket found with this ID");
        }

        var flight = flightsRepository.GetById(ticket.FlightId);

        if (flight is null)
        {
            return NotFound("No flight found with this ID");
        }

        if (flight.SeatsTaken.Contains(ticket.Seat))
        {
            flight.SeatsTaken.Remove(ticket.Seat);
        }

        flightsRepository.Update(flight);

        repository.Delete(ticket);

        return Ok("Ticket successfully deleted and seat removed from flight");
    }

}
