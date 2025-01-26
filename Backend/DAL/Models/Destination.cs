using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Destination
    {
        [Key]
        public string Id { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Airport { get; set; }
        public string ICAO { get; set; }
        public string IATA { get; set; }
        public string FlightNumber { get; set; }
        public string ElevationFt { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string TimeZone { get; set; }
        public string Image { get; set; }
    }
}
