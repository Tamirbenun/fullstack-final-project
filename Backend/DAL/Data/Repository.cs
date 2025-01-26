using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Data;

public abstract class Repository<T>(ContextDAL context) : IRepository<T> where T : class
{
    protected DbSet<T> DbSet = context.Set<T>();
    public virtual void Add(T entity)
    {
        DbSet.Add(entity);
        context.SaveChanges();
    }

    public virtual void Delete(string id)
    {
        var item = GetById(id) ?? throw new ArgumentException("Item Not Found");
        Delete(item);
    }

    public virtual void Delete(T entity)
    {
        DbSet.Remove(entity);
        context.SaveChanges();
    }

    public virtual void Delete(Expression<Func<T, bool>> predicate)
    {
        DbSet.RemoveRange(FindAll(predicate));
        context.SaveChanges();
    }

    public virtual IEnumerable<T> FindAll(Expression<Func<T, bool>> predicate)
    {
        return DbSet.Where(predicate);
    }

    public virtual T? FindOne(Expression<Func<T, bool>> predicate)
    {
        return DbSet.SingleOrDefault(predicate);
    }

    public virtual IEnumerable<T> FindByUserId(string userId)
    {
        return DbSet.AsNoTracking().Where(entity => EF.Property<string>(entity, "UserId") == userId).ToList();
    }

    public virtual IEnumerable<T> FindByDateRange(DateTime startOfDay, DateTime endOfDay)
    {
        return DbSet.AsNoTracking()
                    .Where(entity => EF.Property<DateTime>(entity, "Departure") >= startOfDay
                                  && EF.Property<DateTime>(entity, "Departure") <= endOfDay)
                    .ToList();
    }


    public virtual IEnumerable<T> FindByIATA(string fromIATA, string toIATA, DateTime departure)
    {
        return DbSet.AsNoTracking()
                    .Where(entity => EF.Property<string>(entity, "FromIATA") == fromIATA
                                  && EF.Property<string>(entity, "ToIATA") == toIATA
                                  && EF.Property<DateTime>(entity, "Departure").Date == departure.Date)
                    .ToList();
    }

    public virtual IEnumerable<T> FindByCity(string city)
    {
        return DbSet.AsNoTracking()
                    .Where(entity => EF.Property<string>(entity, "City") == city).ToList();
    }

    public virtual IEnumerable<T> FindByCountry(string Country)
    {
        return DbSet.AsNoTracking()
                    .Where(entity => EF.Property<string>(entity, "Country") == Country).ToList();
    }

    public virtual IEnumerable<T> GetAll()
    {
        try
        {
            return DbSet.AsNoTracking().ToList();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Error accessing the database: " + ex.Message);
        }
    }

    public virtual T? GetById(string id)
    {
        return DbSet.Find(id);
    }

    public virtual T? GetByEmail(string id)
    {
        return DbSet.FirstOrDefault(entity => EF.Property<string>(entity, "Email").ToLower() == id.ToLower());
    }

    public virtual void Update(T entity)
    {
        DbSet.Update(entity);
        context.SaveChanges();
    }

}
