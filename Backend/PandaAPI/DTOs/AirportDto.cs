using System.Text.Json.Serialization;

namespace PandaAPI.DTOs;

public class AirportDto
{
    [JsonPropertyName("icao")]
    public string ICAO {  get; set; }

    [JsonPropertyName("iata")]
    public string IATA { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("region")]
    public string Region { get; set; }

    [JsonPropertyName("country")]
    public string Country { get; set; }

    [JsonPropertyName("elevation_ft")]
    public string Elevation_ft { get; set; }

    [JsonPropertyName("latitude")]
    public string? Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public string? Longitude { get; set; }

    [JsonPropertyName("timezone")]
    public string Timezone { get; set; }

}
