using DAL.Models;

namespace DAL.Data;

public class FlightsRepository(ContextDAL context) : Repository<Flight>(context) {}
