using DAL.Models;
using System.ComponentModel.DataAnnotations;

namespace PandaAPI.DTOs;

public class DestinationDto
{
    public required string Id { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public required string Airport { get; set; }
    public required string ICAO { get; set; }
    public required string IATA { get; set; }
    public required string FlightNumber { get; set; }
    public required string ElevationFt { get; set; }
    public required string Latitude { get; set; }
    public required string Longitude { get; set; }
    public required string TimeZone { get; set; }
    public required string Image { get; set; }

}

public static class DestinationExtensions
{
    public static DestinationDto ToDto(this Destination d)
    {
        return new DestinationDto()
        {
            Id = d.Id,
            City = d.City,
            Country = d.Country,
            Airport = d.Airport,
            ICAO = d.ICAO,
            IATA = d.IATA,
            FlightNumber = d.FlightNumber,
            ElevationFt = d.ElevationFt,
            Latitude = d.Latitude,
            Longitude = d.Longitude,
            TimeZone = d.TimeZone,
            Image = d.Image,
        };
    }
}
