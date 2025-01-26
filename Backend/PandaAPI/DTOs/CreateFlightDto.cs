using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class CreateFlightDto
{

    [Required]
    [MinLength(4), MaxLength(6)]
    public string FlightNumber { get; set; }

    [Required]
    [MinLength(4), MaxLength(4)]
    public required string FromICAO { get; set; }

    [Required]
    [MinLength(3), MaxLength(3)]
    public required string FromIATA { get; set; }

    [Required]
    [MinLength(2), MaxLength(50)]
    public required string FromAirport { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string FromCity { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string FromCountry { get; set; }

    [Required]
    [MinLength(4), MaxLength(4)]
    public required string ToICAO { get; set; }

    [Required]
    [MinLength(3), MaxLength(3)]
    public required string ToIATA { get; set; }

    [Required]
    [MinLength(2), MaxLength(50)]
    public required string ToAirport { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string ToCity { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string ToCountry { get; set; }

    [Required]
    [MinLength(2), MaxLength(3)]
    public required string Gate { get; set; }

    [Required]
    public required DateTime Departure { get; set; }

    [Required]
    public required TimeOnly FlightTime { get; set; }

    [Required]
    public required List<int> Seats { get; set; }

    [Required]
    public required List<string> SeatsTaken { get; set; }

    [Required]
    public required List<double> Price { get; set; }

    public required bool IsActive { get; set; }
}

public static class CreateFlightDtoExtensions
{
    public static Flight ToFlight(this CreateFlightDto dto)
    {
        return new Flight
        {
            Id = Guid.NewGuid().ToString(),
            FlightNumber = dto.FlightNumber,
            FromICAO = dto.FromICAO,
            FromIATA = dto.FromIATA,
            FromAirport = dto.FromAirport,
            FromCity = dto.FromCity,
            FromCountry = dto.FromCountry,
            ToICAO = dto.ToICAO,
            ToIATA = dto.ToIATA,
            ToAirport = dto.ToAirport,
            ToCity = dto.ToCity,
            ToCountry = dto.ToCountry,
            Gate = dto.Gate,
            Departure = dto.Departure,
            FlightTime = dto.FlightTime,
            Seats = dto.Seats,
            SeatsTaken = dto.SeatsTaken,
            Price = dto.Price,
            IsActive = true,
        };
    }
}
