
using DAL.Data;
using DAL.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PandaAPI.Services;
using System.Text;

namespace PandaAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddHttpClient();

        builder.Services.AddDbContext<ContextDAL>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ContextDAL") ?? throw new InvalidOperationException("Connection string 'ContextDAL' not found.")));

        builder.Services.AddIdentity<User, IdentityRole<string>>(options => {
            options.User.RequireUniqueEmail = true;
            options.Password.RequiredLength = 6;
            options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
        }).AddEntityFrameworkStores<ContextDAL>();

        var jwtSettings = builder.Configuration.GetSection("JwtSettings");

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
            };
        });

        builder.Services.AddScoped<FlightsRepository>();
        builder.Services.AddScoped<DestinationsRepository>();
        builder.Services.AddScoped<TicketsRepository>();
        builder.Services.AddScoped<NewsletterRepository>();
        builder.Services.AddScoped<NotificationsRepository>();

        builder.Services.AddScoped<IRepository<Ticket>, TicketsRepository>();
        builder.Services.AddScoped<IRepository<Flight>, FlightsRepository>();
        builder.Services.AddScoped<IRepository<Notification>, NotificationsRepository>();

        builder.Services.AddScoped<JwtService>();

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var corsPolicy = "CorsPolicy";

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: corsPolicy, policy =>
            {
                policy.WithOrigins([
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5175",
                    ])
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
        });

        builder.Services.AddTransient<EmailService>();

        builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

        var app = builder.Build();

        //var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
        //app.Urls.Add($"http://*:{port}");
        //app.MapGet("/", () => "Hello, Render!");

        app.UseCors(corsPolicy);

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
