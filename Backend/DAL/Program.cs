
using DAL.Data;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<ContextDAL>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ContextDAL") 
            ?? throw new InvalidOperationException("Connection String 'ContextDAL' not found.")));

        builder.Services.AddControllers();

        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen();


        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.MapControllers();

        app.Run();
    }
}
