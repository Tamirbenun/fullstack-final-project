using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class DestinationsController(DestinationsRepository repository) : ControllerBase
    {
        [HttpGet]
        public ActionResult GetDestinations()
        {
            var allDestinations = repository.GetAll();

            if (allDestinations is null)
            {
                return NotFound("No Destinations found");
            }

            var newDestination = new Destination
            {
                Id = Guid.NewGuid().ToString(),
                City = "Tel Aviv",
                Country = "IL",
                Airport = "Ben Gurion International Airport",
                ICAO = "LLBG",
                IATA = "TLV",
                FlightNumber = "",
                ElevationFt = "100",
                Latitude = "32.0113983154",
                Longitude = "34.8866996765",
                TimeZone = "Asia/Jerusalem"
            };

            var destinationsList = allDestinations.ToList();

            destinationsList.Insert(0, newDestination);

            return Ok(destinationsList.Select(a => a.ToDto()));
        }

        [HttpGet("{id}")]
        public ActionResult GetDestinationById(string id)
        {
            var Destination = repository.GetById(id);

            if (Destination is null)
            {
                return NotFound("No Destination found with this ID");
            }
            return Ok(Destination);
        }

        [HttpGet("City/{city}")]
        public ActionResult<IEnumerable<Destination>> GetDestinationByCity(string city)
        {
            var Destination = repository.FindByCity(city);

            if (Destination == null || !Destination.Any())
            {
                return NotFound("No Destination found");
            }

            return Ok(Destination);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public ActionResult AddDestination(CreateDestinationDto dto)
        {
            if (ModelState.IsValid)
            {
                var Destination = dto.ToDestination();

                repository.Add(Destination);
                return CreatedAtAction(nameof(GetDestinationById), new { id = Destination.Id }, Destination.ToDto());
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public ActionResult EditDestinationById(string id, UpdateDestinationDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var Destination = repository.GetById(id);

            if (Destination is null)
            {
                return NotFound("No Destination found with this ID");
            }

            Destination.FlightNumber = dto.FlightNumber;
            Destination.City = dto.City;
            Destination.Country = dto.Country;
            Destination.Airport = dto.Airport;
            Destination.ICAO = dto.ICAO;
            Destination.IATA = dto.IATA;
            Destination.ElevationFt = dto.ElevationFt;
            Destination.Latitude = dto.Latitude;
            Destination.Longitude = dto.Longitude;
            Destination.TimeZone = dto.TimeZone;

            repository.Update(Destination);

            return Ok("Destination successfully updated");
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public ActionResult DeleteDestinationById(string id)
        {
            var Destination = repository.GetById(id);

            if (Destination is null)
            {
                return NotFound("No Destination found with this ID");
            }
            repository.Delete(Destination);
            return Ok($"Destination {Destination.City + ", " + Destination.Country} successfully deleted");
        }
    }
}
