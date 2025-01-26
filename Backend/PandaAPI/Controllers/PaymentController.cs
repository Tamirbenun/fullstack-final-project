using Microsoft.AspNetCore.Mvc;
using PandaAPI.DTOs;
using DAL.Models;
using DAL.Data;
using System.Net.Sockets;
using Microsoft.AspNetCore.Authorization;

namespace PandaAPI.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IRepository<Ticket> _ticketRepository;
        private readonly IRepository<Flight> _flightRepository;
        private readonly IRepository<Notification> _notificationRepository;

        public PaymentController(
            IRepository<Ticket> ticketRepository,
            IRepository<Flight> flightRepository,
            IRepository<Notification> notificationRepository)
        {
            _ticketRepository = ticketRepository;
            _flightRepository = flightRepository;
            _notificationRepository = notificationRepository;
        }

        [HttpPost("ProcessPayment")]
        [Authorize]
        public IActionResult ProcessPayment([FromBody] PaymentDetailsDto paymentDetails)
        {
            var seats = new List<int>();

            foreach (var ticket in paymentDetails.Tickets)
            {
                string seat = ticket.Seat;
                seat = seat.Substring(1);
                if (int.TryParse(seat, out int seatNumber))
                {
                    seats.Add(seatNumber);
                }
                else
                {
                    return BadRequest($"Failed to parse seat: {seat}");
                }
            }

            var flightId = paymentDetails.Tickets.First().FlightId;

            var flight = _flightRepository.GetById(flightId);

            var flightSeats = new List<int>();

            foreach (var seat in flight.Seats)
            {
                flightSeats.Add(seat);
            }

            var flightPrice = new List<double>();

            foreach (var price in flight.Price)
            {
                flightPrice.Add(price);
            }

            var prices = new List<double>();

            int first = flightSeats[0] / 4;
            int business = first + (flightSeats[1] / 6) ;

            foreach (var seat in seats)
            {
                if (seat <= first)
                {
                    prices.Add(flightPrice[0]);
                } else if (seat > first && seat <= business)
                {
                    prices.Add(flightPrice[1]);
                }
                else if (seat > business)
                {
                    prices.Add(flightPrice[2]);
                }
            }

            double totalPrice = prices.Sum();

            if (string.IsNullOrEmpty(paymentDetails.CardNumber) ||
                string.IsNullOrEmpty(paymentDetails.CardHolderName) ||
                string.IsNullOrEmpty(paymentDetails.ExpirationDate) ||
                string.IsNullOrEmpty(paymentDetails.CVV) ||
                totalPrice <= 0)
            {
                return BadRequest("Invalid payment details.");
            }

            bool paymentSuccess = SimulatePaymentProcessing(paymentDetails);

            if (paymentSuccess)
            {
                PostTickets(paymentDetails.Tickets);
                return Ok($"Payment {totalPrice}$ processed successfully.");
            }
            else
            {
                return StatusCode(500, "Payment failed. Please try again later.");
            }
        }

        private bool SimulatePaymentProcessing(PaymentDetailsDto paymentDetails)
        {
            return true;
        }

        [HttpPost("PostTickets")]
        [Authorize]
        public async Task<IActionResult> PostTickets([FromBody] List<CreateTicketDto> ticketDtos)
        {

            if (ticketDtos == null || !ticketDtos.Any())
            {
                return BadRequest("No tickets provided.");
            }

            var updatedTickets = new List<Ticket>();
            var userId = ticketDtos.First().UserId;

            foreach (var ticketDto in ticketDtos)
            {
                var ticket = ticketDto.ToTicket();
                _ticketRepository.Add(ticket);
                updatedTickets.Add(ticket);
            }

            foreach (var ticket in updatedTickets)
            {
                var flight = _flightRepository.GetById(ticket.FlightId);
                if (flight == null)
                {
                    return NotFound($"Flight ID: {ticket.FlightId} Not Found.");
                }

                if (!flight.SeatsTaken.Contains(ticket.Seat))
                {
                    flight.SeatsTaken.Add(ticket.Seat);
                    _flightRepository.Update(flight);
                }
            }

            var notification = new Notification
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                DateTime = DateTime.Now,
                img = "https://i.postimg.cc/rwJcWVzK/ap-profile.jpg",
                Name = "AirPanda",
                Title = "Tickets purchased successfully",
                Content = @"Your flight tickets are waiting for you on the 'My Tickets' page. 
                You must arrive at the airport at least 3 hours before the flight time specified on the ticket.
                Have a nice flight,
                AirPanda Team",
                isReade = false
            };

            _notificationRepository.Add(notification);

            return Ok("Payment was made successfully.");
        }
    }
}
