using System.ComponentModel.DataAnnotations;

namespace DAL.Models;

public class Ticket
{
    [Key]
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
