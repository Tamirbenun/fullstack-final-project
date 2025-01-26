using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class UpdateFlightDto
{
    [Required]
    [MinLength(4), MaxLength(6)]
    public string FlightNumber { get; set; }
    [Required]
    [MinLength(4), MaxLength(4)]
    public string FromICAO { get; set; }
    [Required]
    [MinLength(3), MaxLength(3)]
    public string FromIATA { get; set; }
    [Required]
    [MinLength(2), MaxLength(50)]
    public string FromAirport { get; set; }
    [Required]
    [MinLength(2), MaxLength(20)]
    public string FromCity { get; set; }
    [Required]
    [MinLength(2), MaxLength(20)]
    public string FromCountry { get; set; }
    [Required]
    public double FromLat { get; set; }
    [Required]
    public double FromLon { get; set; }
    [Required]
    [MinLength(4), MaxLength(4)]
    public string ToICAO { get; set; }
    [Required]
    [MinLength(3), MaxLength(3)]
    public string ToIATA { get; set; }
    [Required]
    [MinLength(2), MaxLength(50)]
    public string ToAirport { get; set; }
    [Required]
    [MinLength(2), MaxLength(20)]
    public string ToCity { get; set; }
    [Required]
    [MinLength(2), MaxLength(20)]
    public string ToCountry { get; set; }
    [Required]
    public double ToLat { get; set; }
    [Required]
    public double ToLon { get; set; }
    [Required]
    [MinLength(2), MaxLength(3)]
    public string Gate { get; set; }
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

    [Required]
    public required bool IsActive { get; set; }
}

public static class UpdateFlightDtoExtensions
{
    public static Flight ToFlight(this UpdateFlightDto dto)
    {
        return new Flight
        {
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
            IsActive = dto.IsActive,
        };
    }
}
