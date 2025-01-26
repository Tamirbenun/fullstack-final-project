using DAL.Models;

namespace PandaAPI.DTOs;

public class FlightDto
{
    public string Id { get; set; }
    public string FlightNumber { get; set; }
    public string FromICAO { get; set; }
    public string FromIATA { get; set; }
    public string FromAirport { get; set; }
    public string FromCity { get; set; }
    public string FromCountry { get; set; }
    public string ToICAO { get; set; }
    public string ToIATA { get; set; }
    public string ToAirport { get; set; }
    public string ToCity { get; set; }
    public string ToCountry { get; set; }
    public string Gate { get; set; }
    public DateTime Departure { get; set; }
    public TimeOnly FlightTime { get; set; }
    public List<int> Seats { get; set; }
    public List<string> SeatsTaken { get; set; }
    public List<double> Price { get; set; }

    public bool IsActive { get; set; }
}

public static class FlightExtensions
{
    public static FlightDto ToDto(this Flight f)
    {
        return new FlightDto()
        {
            Id = f.Id,
            FlightNumber = f.FlightNumber,
            FromICAO = f.FromICAO,
            FromIATA = f.FromIATA,
            FromAirport = f.FromAirport,
            FromCity = f.FromCity,
            FromCountry = f.FromCountry,
            ToICAO = f.ToICAO,
            ToIATA = f.ToIATA,
            ToAirport = f.ToAirport,
            ToCity = f.ToCity,
            ToCountry = f.ToCountry,
            Gate = f.Gate,
            Departure = f.Departure,
            FlightTime = f.FlightTime,
            Seats = f.Seats,
            SeatsTaken = f.SeatsTaken,
            Price = f.Price,
            IsActive = f.IsActive,
        };
    }
}
