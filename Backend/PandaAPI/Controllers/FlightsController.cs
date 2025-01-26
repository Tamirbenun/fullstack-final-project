using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;

namespace PandaAPI.Controllers;

[Route("Api/[controller]")]
[ApiController]
public class FlightsController(FlightsRepository repository) : ControllerBase
{
    [HttpGet("{id}")]
    [Authorize(Roles = "admin")]
    public ActionResult GetFlightById(string id)
    {
        var flight = repository.GetById(id);

        if (flight is null)
        {
            return NotFound("No Flight found with this ID");
        }
        return Ok(flight);
    }

    [HttpGet("{fromIATA}/{toIATA}/{departure}")]
    [Authorize]
    public ActionResult<IEnumerable<Flight>> GetFlightsByIATA(string fromIATA, string toIATA, DateTime departure)
    {
        var flights = repository.FindByIATA(fromIATA, toIATA, departure);
        if (flights == null || !flights.Any())
        {
            return NotFound("No flights found");
        }

        var sortedFlights = flights.OrderBy(f => f.Departure).ToList();

        return Ok(sortedFlights);
    }

    [HttpGet("Dates/{departure}")]
    [Authorize(Roles = "admin")]
    public ActionResult<IEnumerable<Flight>> GetFlightsByDate(DateTime departure)
    {
        var startOfDay = new DateTime(departure.Year, departure.Month, departure.Day, 0, 0, 0);
        var endOfDay = startOfDay.AddDays(1).AddTicks(-1);

        var flights = repository.FindByDateRange(startOfDay, endOfDay);

        if (flights == null || !flights.Any())
        {
            return NotFound("No flights found for this date");
        }

        var sortedFlights = flights.OrderBy(f => f.Departure).ToList();

        return Ok(sortedFlights);
    }

    [HttpGet("Count/{departure}")]
    [Authorize(Roles = "admin")]
    public ActionResult<int> GetFlightsCountByDate(DateTime departure)
    {
        var startOfDay = new DateTime(departure.Year, departure.Month, departure.Day, 0, 0, 0);
        var endOfDay = startOfDay.AddDays(1).AddTicks(-1);

        var flights = repository.FindByDateRange(startOfDay, endOfDay)
                                .Where(f => f.IsActive)
                                .ToList();

        if (flights == null || !flights.Any())
        {
            return Ok(0);
        }

        return Ok(flights.Count);
    }

    [HttpGet("Closest/{departure}")]
    [Authorize(Roles = "admin")]
    public ActionResult<IEnumerable<Flight>> GetClosestFlights(DateTime departure)
    {
        var endOfDay = departure.Date.AddDays(1).AddTicks(-1);
        var flights = repository.FindByDateRange(departure, endOfDay)
                                .Where(f => f.IsActive)
                                .OrderBy(f => f.Departure)
                                .Take(3) 
                                .ToList();


        if (flights == null || !flights.Any())
        {
            return Ok(new List<Flight>());
        }

        return Ok(flights);
    }


    [HttpPost]
    [Authorize]
    public ActionResult AddFlights(CreateFlightDto[] dtos)
    {
        if (ModelState.IsValid)
        {
            int addedFlightsCount = 0;

            foreach (var dto in dtos)
            {
                var flight = dto.ToFlight();
                repository.Add(flight);
                addedFlightsCount++;
            }

            return Ok($"{addedFlightsCount} Flights created successfully");
        }
        return BadRequest(ModelState);
    }


    [HttpPut("{id}")]
    [Authorize(Roles = "admin")]
    public ActionResult EditFlightById(string id, UpdateFlightDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var flight = repository.GetById(id);

        if (flight is null)
        {
            return NotFound("No flight found with this ID");
        }

        flight.FromICAO = dto.FromICAO;
        flight.FromIATA = dto.FromIATA;
        flight.FromAirport = dto.FromAirport;
        flight.FromCity = dto.FromCity;
        flight.FromCountry = dto.FromCountry;
        flight.ToICAO = dto.ToICAO;
        flight.ToIATA = dto.ToIATA;
        flight.ToAirport = dto.ToAirport;
        flight.ToCity = dto.ToCity;
        flight.ToCountry = dto.ToCountry;
        flight.Gate = dto.Gate;
        flight.Departure = dto.Departure;
        flight.FlightTime = dto.FlightTime;
        flight.Seats = dto.Seats;
        flight.SeatsTaken = dto.SeatsTaken;
        flight.Price = dto.Price;

        repository.Update(flight);

        return Ok("Flight successfully updated");
    }

    [HttpPut("SeatsTaken/{id}")]
    [Authorize]
    public ActionResult EditFlightSeatsTakenById(string id, [FromBody] List<string> seatsTaken)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var flight = repository.GetById(id);

        if (flight is null)
        {
            return NotFound("No flight found with this ID");
        }

        flight.SeatsTaken = seatsTaken;

        repository.Update(flight);

        return Ok("Flight successfully updated");
    }

    [HttpPut("SeatsTaken/{id}/{seat}")]
    [Authorize(Roles = "admin")]
    public ActionResult EditFlightSeatsTakenById(string id, string seat)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var flight = repository.GetById(id);

        if (flight is null)
        {
            return NotFound("No flight found with this ID");
        }

        if (flight.SeatsTaken.Contains(seat))
        {
            flight.SeatsTaken.Remove(seat);
            repository.Update(flight);
            return Ok($"Seat {seat} successfully removed from the flight.");
        }

        flight.SeatsTaken.Add(seat);
        repository.Update(flight);
        return Ok($"Seat {seat} successfully added to the flight.");
    }



    [HttpDelete("{id}")]
    [Authorize(Roles = "admin")]
    public ActionResult DeleteFlightById(string id)
    {
        var flight = repository.GetById(id);

        if (flight is null)
        {
            return NotFound("No Flight found with this ID");
        }
        repository.Delete(flight);
        return Ok("Flight successfully deleted");
    }
}
