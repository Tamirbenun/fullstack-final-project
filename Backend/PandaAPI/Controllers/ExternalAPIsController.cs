using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class ExternalAPIsController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ExternalAPIsController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    [HttpGet("Airports/{filter}/{search}")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<List<AirportDto>>> GetAirports(string filter, string search )
    {
        var client = _httpClientFactory.CreateClient();
        var APINinjasUrl = _configuration["APINinjas:BaseUrl"] + $"/airports?{filter}={search}";
        var apiKey = _configuration["APINinjas:ApiKey"];

        try
        {
            client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);

            var response = await client.GetAsync(APINinjasUrl);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var data = JsonConvert.DeserializeObject<List<AirportDto>>(content);

                return Ok(data);
            }

            return Ok(new[] { new { message = $"No airports found for \"{search}\"" } });
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Error fetching data from API Ninjas: {ex.Message}");
        }
    }
}
