using System.ComponentModel.DataAnnotations;

namespace DAL.Models;

public class Flight
{
    [Key]
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
    public string Gate {  get; set; }
    public DateTime Departure { get; set; }
    public TimeOnly FlightTime { get; set; }
    public List<int> Seats { get; set; }
    public List<string> SeatsTaken { get; set; }
    public List<double> Price { get; set; }
    public bool IsActive { get; set; }
}
