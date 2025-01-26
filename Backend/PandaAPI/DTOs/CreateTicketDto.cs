using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class CreateTicketDto
{
    [Required]
    [MinLength(1), MaxLength(100)]
    public required string FlightId { get; set; }

    [Required]
    [MinLength(1), MaxLength(100)]
    public required string UserId { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string FirstName { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string LastName { get; set; }

    [Required]
    [MinLength(8), MaxLength(10)]
    public required string IdNumber { get; set; }

    [Required]
    [MinLength(3), MaxLength(5)]
    public required string FlightNumber { get; set; }

    [Required]
    public required DateTime Date { get; set; }

    [Required]
    [MinLength(2), MaxLength(4)]
    public required string Gate { get; set; }

    [Required]
    [MinLength(2), MaxLength(4)]
    public required string Seat { get; set; }

    [Required]
    [MinLength(1), MaxLength(20)]
    public required string Class { get; set; }
}

public static class CreateTicketDtoExtensions
{
    public static Ticket ToTicket(this CreateTicketDto dto)
    {
        return new Ticket
        {
            Id = Guid.NewGuid().ToString(),
            FlightId = dto.FlightId,
            UserId = dto.UserId,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            IdNumber = dto.IdNumber,
            FlightNumber = dto.FlightNumber,
            Date = dto.Date,
            Gate = dto.Gate,
            Seat = dto.Seat,
            Class = dto.Class,
        };
    }
}
