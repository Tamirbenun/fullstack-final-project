using DAL.Models;

namespace PandaAPI.DTOs;

public class TicketDto
{
    public required string Id { get; set; }
    public required string FlightId { get; set; }
    public required string UserId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string IdNumber { get; set; }
    public required string FlightNumber { get; set; }
    public required DateTime Date { get; set; }
    public required string Gate { get; set; }
    public required string Seat { get; set; }
    public required string Class { get; set; }
}

public static class TicketExtensions
{
    public static TicketDto ToDto(this Ticket t)
    {
        return new TicketDto()
        {
            Id = t.Id,
            FlightId = t.FlightId,
            UserId = t.UserId,
            FirstName = t.FirstName,
            LastName = t.LastName,
            IdNumber = t.IdNumber,
            FlightNumber = t.FlightNumber,
            Date = t.Date,
            Gate = t.Gate,
            Seat = t.Seat,
            Class = t.Class,
        };
    }
}

