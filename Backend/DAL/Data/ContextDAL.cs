using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DAL.Models;
using System;
using Microsoft.EntityFrameworkCore.Diagnostics;
using static System.Net.Mime.MediaTypeNames;

namespace DAL.Data;

public class ContextDAL(DbContextOptions<ContextDAL> options) :
    IdentityDbContext<User, IdentityRole<string>, string>(options)
{
    public DbSet<Flight> Flights { get; set; } = default!;
    public DbSet<Ticket> Tickets { get; set; } = default!;
    public DbSet<Destination> Destinations { get; set; } = default!;
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Newsletter> Newsletter { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning)
        );
    }

    public int count = 0;
    private List<Flight> GenerateFlights(
    string fromCity,
    string toCity,
    DateTime startDate,
    int flightsPerDay)
    {
        var random = new Random();
        var flights = new List<Flight>();

        var airports = new[]
        {
        new { ICAO = "LLBG", IATA = "TLV", Airport = "Ben Gurion International Airport", City = "Tel Aviv", Country = "IL" },
        new { ICAO = "EGLL", IATA = "LHR", Airport = "Heathrow Airport", City = "London", Country = "GB" },
        new { ICAO = "LCLK", IATA = "LCA", Airport = "Larnaca International Airport", City = "Larnaca", Country = "CY" },
        new { ICAO = "EHAM", IATA = "AMS", Airport = "Amsterdam Airport Schiphol", City = "Amsterdam", Country = "NL" },
        new { ICAO = "LGSR", IATA = "JTR", Airport = "Santorini Airport", City = "Santorini Island", Country = "GR" },
        new { ICAO = "RJTT", IATA = "HND", Airport = "Tokyo Haneda Airport", City = "Tokyo", Country = "JP" },
        new { ICAO = "YSSY", IATA = "SYD", Airport = "Sydney Kingsford Smith Airport", City = "Sydney", Country = "AU" }
    };

        var flightNumbers = new Dictionary<string, string>
    {
        { "TLV-LHR", "AP01" },
        { "TLV-LCA", "AP02" },
        { "TLV-AMS", "AP03" },
        { "TLV-JTR", "AP04" },
        { "TLV-HND", "AP05" },
        { "TLV-SYD", "AP06" },
    };

        var from = airports.FirstOrDefault(a => a.City == fromCity);
        var to = airports.FirstOrDefault(a => a.City == toCity);

        if (from == null || to == null)
            throw new ArgumentException("One or both of the specified cities do not exist in the airport list.");

        var routeKey = $"{from.IATA}-{to.IATA}";
        if (!flightNumbers.TryGetValue(routeKey, out var flightNumber))
        {
            routeKey = $"{to.IATA}-{from.IATA}";
            if (!flightNumbers.TryGetValue(routeKey, out flightNumber))
            {
                throw new ArgumentException($"No flight number mapping found for the route {from.IATA}-{to.IATA} or {to.IATA}-{from.IATA}.");
            }
        }

        if (count < 1)
        {
            flights.Add(new Flight
            {
                Id = "F0001",
                FlightNumber = "AP02",
                FromICAO = "LLBG",
                FromIATA = "TLV",
                FromAirport = "Ben Gurion International Airport",
                FromCity = "Tel Aviv",
                FromCountry = "IL",
                ToICAO = "LCLK",
                ToIATA = "LCA",
                ToAirport = "Larnaca International Airport",
                ToCity = "Larnaca",
                ToCountry = "CY",
                Gate = "G18",
                Departure = new DateTime(2025, 1, 29, 8, 30, 0),
                FlightTime = new TimeOnly(1, 30),
                Seats = new List<int> { 16, 48, 102 },
                SeatsTaken = new List<string> { "A1", "A2", "A3" },
                Price = new List<double> { 1800, 800, 300 },
                IsActive = true,
            });

            flights.Add(new Flight
            {
                Id = "F0002",
                FlightNumber = "AP02",
                FromICAO = "LCLK",
                FromIATA = "LCA",
                FromAirport = "Larnaca International Airport",
                FromCity = "Larnaca",
                FromCountry = "CY",
                ToICAO = "LLBG",
                ToIATA = "TLV",
                ToAirport = "Ben Gurion International Airport",
                ToCity = "Tel Aviv",
                ToCountry = "IL",
                Gate = "D5",
                Departure = new DateTime(2025, 1, 29, 8, 30, 0),
                FlightTime = new TimeOnly(1, 30),
                Seats = new List<int> { 16, 48, 102 },
                SeatsTaken = new List<string> { "A1", "A2", "A3" },
                Price = new List<double> { 1800, 800, 300 },
                IsActive = true,
            });

            count = 2;
        }

        for (int day = 0; day < flightsPerDay; day++)
        {
            var departureBase = startDate.AddDays(day);
            for (int hour = 0; hour < 24; hour++)
            {
                var departure = departureBase.AddHours(hour).AddMinutes(random.Next(0, 60));
                var flightTime = TimeSpan.FromHours(random.Next(1, 5));

                flights.Add(new Flight
                {
                    Id = Guid.NewGuid().ToString(),
                    FlightNumber = flightNumber,
                    FromICAO = from.ICAO,
                    FromIATA = from.IATA,
                    FromAirport = from.Airport,
                    FromCity = from.City,
                    FromCountry = from.Country,
                    ToICAO = to.ICAO,
                    ToIATA = to.IATA,
                    ToAirport = to.Airport,
                    ToCity = to.City,
                    ToCountry = to.Country,
                    Gate = $"G{random.Next(1, 20)}",
                    Departure = departure,
                    FlightTime = TimeOnly.FromTimeSpan(flightTime),
                    Seats = new List<int> { 16, 48, 102 },
                    SeatsTaken = new List<string> { "A1", "A2", "A3" },
                    Price = new List<double> { 1800, 800, 300 },
                    IsActive = true,
                });
            }
        }

        return flights;
    }

    public List<Flight> GenerateFlightsForAirports()
    {
        var airports = new[]
        {
        new { ICAO = "LLBG", IATA = "TLV", Airport = "Ben Gurion International Airport", City = "Tel Aviv", Country = "IL" },
        new { ICAO = "EGLL", IATA = "LHR", Airport = "Heathrow Airport", City = "London", Country = "GB" },
        new { ICAO = "LCLK", IATA = "LCA", Airport = "Larnaca International Airport", City = "Larnaca", Country = "CY" },
        new { ICAO = "EHAM", IATA = "AMS", Airport = "Amsterdam Airport Schiphol", City = "Amsterdam", Country = "NL" },
        new { ICAO = "LGSR", IATA = "JTR", Airport = "Santorini Airport", City = "Santorini Island", Country = "GR" },
        new { ICAO = "RJTT", IATA = "HND", Airport = "Tokyo Haneda Airport", City = "Tokyo", Country = "JP" },
        new { ICAO = "YSSY", IATA = "SYD", Airport = "Sydney Kingsford Smith Airport", City = "Sydney", Country = "AU" }
    };

        var flightsList = new List<List<Flight>>();
        DateTime startDate = DateTime.Now;
        DateTime roundedStartDate = new DateTime(
             startDate.Year,
             startDate.Month,
             startDate.Day,
             startDate.Hour,
             0,
             0,
             0
             );
        DateTime endDate = roundedStartDate.AddDays(10);

        for (DateTime date = roundedStartDate; date <= endDate; date = date.AddDays(1))
        {
            foreach (var airport in airports)
            {
                if (airport.City != "Tel Aviv")
                {
                    flightsList.Add(GenerateFlights("Tel Aviv", airport.City, date, 1));
                    flightsList.Add(GenerateFlights(airport.City, "Tel Aviv", date, 1));
                }
            }
        }

        var allFlights = flightsList.SelectMany(flights => flights).ToList();
        return allFlights;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Flight>().HasData(GenerateFlightsForAirports());

        modelBuilder.Entity<Destination>().HasData(
            new Destination()
            {
                Id = "D0001",
                City = "London",
                Country = "GB",
                Airport = "Heathrow Airport",
                ICAO = "EGLL",
                IATA = "LHR",
                FlightNumber = "AP01",
                ElevationFt = "83",
                Latitude = "51.4706001282",
                Longitude = "-0.4619410038",
                TimeZone = "Europe/London",
                Image = "https://i.postimg.cc/qRhDCK8t/london.jpg",
            },
            new Destination()
            {
                Id = "D0002",
                City = "Larnaca",
                Country = "CY",
                Airport = "Larnaca International Airport",
                ICAO = "LCLK",
                IATA = "LCA",
                FlightNumber = "AP02",
                ElevationFt = "8",
                Latitude = "34.8750991821",
                Longitude = "33.6249008179",
                TimeZone = "Asia/Nicosia",
                Image = "https://i.postimg.cc/FRMWbKZT/larnaca.jpg",
            },
            new Destination()
            {
                Id = "D0003",
                City = "Amsterdam",
                Country = "NL",
                Airport = "Amsterdam Airport Schiphol",
                ICAO = "EHAM",
                IATA = "AMS",
                FlightNumber = "AP03",
                ElevationFt = "-11",
                Latitude = "52.3086013794",
                Longitude = "4.7638897896",
                TimeZone = "Europe/Amsterdam",
                Image = "https://i.postimg.cc/Hkf1vTB7/amsterdam.jpg",
            },
            new Destination()
            {
                Id = "D0004",
                City = "Santorini Island",
                Country = "GR",
                Airport = "Santorini Airport",
                ICAO = "LGSR",
                IATA = "JTR",
                FlightNumber = "AP04",
                ElevationFt = "127",
                Latitude = "36.3992004395",
                Longitude = "25.4792995453",
                TimeZone = "Europe/Athens",
                Image = "https://i.postimg.cc/Hk4XLkRQ/Santorini.jpg",

            },
            new Destination()
            {
                Id = "D0005",
                City = "Tokyo",
                Country = "JP",
                Airport = "Tokyo Haneda Airport",
                ICAO = "RJTT",
                IATA = "HND",
                FlightNumber = "AP05",
                ElevationFt = "35",
                Latitude = "35.5522994995",
                Longitude = "139.7799987793",
                TimeZone = "Asia/Tokyo",
                Image = "https://i.postimg.cc/j2y8Mr3t/tokyo.jpg",
            },
            new Destination()
            {
                Id = "D0006",
                City = "Sydney",
                Country = "AU",
                Airport = "Sydney Kingsford Smith Airport",
                ICAO = "YSSY",
                IATA = "SYD",
                FlightNumber = "AP06",
                ElevationFt = "21",
                Latitude = "-33.9460983276",
                Longitude = "151.1770019531",
                TimeZone = "Australia/Sydney",
                Image = "https://i.postimg.cc/j2MSDCPF/Sydney.jpg",
            }
        );

        modelBuilder.Entity<Ticket>()
            .HasData(
                new Ticket()
                {
                    Id = "T0001",
                    FlightId = "F0001",
                    UserId = "U0001",
                    FirstName = "Tamir",
                    LastName = "Benun",
                    IdNumber = "123456789",
                    FlightNumber = "AP0001",
                    Date = new DateTime(2025, 1, 27, 19, 30, 0), 
                    Gate = "G18",
                    Seat = "A1",
                    Class = "First Class",
                },
                new Ticket()
                {
                    Id = "T0002",
                    FlightId = "F0002",
                    UserId = "U0001",
                    FirstName = "Tamir",
                    LastName = "Benun",
                    IdNumber = "123456789",
                    FlightNumber = "AP0002",
                    Date = new DateTime(2025, 1, 27, 19, 30, 0), 
                    Gate = "D5",
                    Seat = "A1",
                    Class = "First Class",
                }
            );

        modelBuilder.Entity<Newsletter>()
            .HasData(
                new Newsletter()
                {
                    Email = "tamirbenun@gmail.com",
                    JoiningDate = new DateTime(2025,1,27,19,26,0),
                },
                new Newsletter()
                {
                    Email = "tamir@gmail.com",
                    JoiningDate = new DateTime(2025, 1, 27, 19, 27, 0),
                },
                new Newsletter()
                {
                    Email = "rotem@gmail.com",
                    JoiningDate = new DateTime(2025, 1, 20, 14, 40, 0),
                },
                new Newsletter()
                {
                    Email = "ben@gmail.com",
                    JoiningDate = new DateTime(2025, 1, 10, 10, 3, 0),
                }
            );

        modelBuilder.Entity<Notification>()
            .HasData(
                new Notification()
                {
                    Id = "N0001",
                    UserId = "U0001",
                    DateTime = new DateTime(2025, 1, 27, 19, 30, 0), 
                    img = "https://i.postimg.cc/rwJcWVzK/ap-profile.jpg",
                    Name = "AirPanda",
                    Title = "Welcome!",
                    Content = "Thank you for joining us. We're excited to have you on board and can't wait for you to explore everything we have to offer. =)",
                    isReade = false,
                }
            );

        var hasher = new PasswordHasher<User>();

        modelBuilder.Entity<User>()
            .HasData(
                new User()
                {
                    Id = "U0001",
                    UserName = "tamir benun",
                    NormalizedUserName = "TAMIR BENUN",
                    Email = "tamir@gmail.com",
                    NormalizedEmail = "TAMIR@GMAIL.COM",
                    Image = "https://i.postimg.cc/zBvpSwhy/avatar-09.jpg",
                    SecurityStamp = "3389ca89-f952-4543-bbef-cc643b378c61",
                    PasswordHash = hasher.HashPassword(null, "123456"),
                },
                new User()
                {
                    Id = "U0002",
                    UserName = "rotem barda",
                    NormalizedUserName = "ROTEM BARDA",
                    Email = "rotem@gmail.com",
                    NormalizedEmail = "ROTEM@GMAIL.COM",
                    Image = "https://i.postimg.cc/bvzmdfNH/avatar-10.jpg",
                    SecurityStamp = "aff8bc20-30a4-41eb-a819-c021ff111641",
                    PasswordHash = hasher.HashPassword(null, "123456"),
                },
                new User()
                {
                    Id = "U0003",
                    UserName = "ben cohen",
                    NormalizedUserName = "BEN COHEN",
                    Email = "ben@gmail.com",
                    NormalizedEmail = "BEN@GMAIL.COM",
                    Image = "https://i.postimg.cc/zBvpSwhy/avatar-09.jpg",
                    SecurityStamp = "247d2866-d18f-407b-85b6-f50a7851bee3",
                    PasswordHash = hasher.HashPassword(null, "123456"),
                }
            );

        modelBuilder.Entity<IdentityRole<string>>()
            .HasData([
                new IdentityRole<string>(){
                    Id = "A",
                    Name = "admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                }
                ]);

        modelBuilder.Entity<IdentityUserRole<string>>()
            .HasData([
                new IdentityUserRole<string>(){
                    RoleId = "A",
                    UserId = "U0001"
                }
                ]);
    }
}
