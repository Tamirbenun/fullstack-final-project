using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class UpdateDestinationDto
{
    [Required]
    [MinLength(2), MaxLength(20)]
    public required string City { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string Country { get; set; }

    [Required]
    [MinLength(2), MaxLength(30)]
    public required string Airport { get; set; }

    [Required]
    [MinLength(4), MaxLength(4)]
    public required string ICAO { get; set; }

    [Required]
    [MinLength(3), MaxLength(3)]
    public required string IATA { get; set; }

    [Required]
    [MinLength(4), MaxLength(6)]
    public required string FlightNumber { get; set; }

    [Required]
    public required string ElevationFt { get; set; }

    [Required]
    public required string Latitude { get; set; }

    [Required]
    public required string Longitude { get; set; }

    [Required]
    [MinLength(2), MaxLength(20)]
    public required string TimeZone { get; set; }

    [Required]
    [MinLength(2), MaxLength(100)]
    public required string Image { get; set; }
}

public static class UpdateDestinationExtensions
{
    public static Destination ToDestination(this UpdateDestinationDto dto)
    {
        return new Destination
        {
            City = dto.City,
            Country = dto.Country,
            Airport = dto.Airport,
            ICAO = dto.ICAO,
            IATA = dto.IATA,
            FlightNumber = dto.FlightNumber,
            ElevationFt = dto.ElevationFt,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            TimeZone = dto.TimeZone,
            Image = dto.Image,
        };
    }
}
