using System.Linq.Expressions;

namespace DAL.Data;

public interface IRepository<T> where T : class
{
    void Add(T entity);
    T? GetById(string id);
    T? GetByEmail(string id);
    IEnumerable<T> GetAll();
    IEnumerable<T> FindAll(Expression<Func<T, bool>> predicate);
    T? FindOne(Expression<Func<T, bool>> predicate);
    void Update(T entity);
    void Delete(string id);
    void Delete(T entity);
    void Delete(Expression<Func<T, bool>> predicate);
}
