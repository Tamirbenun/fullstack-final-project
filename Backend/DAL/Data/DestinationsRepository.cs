using DAL.Models;

namespace DAL.Data;

public class DestinationsRepository(ContextDAL context) : Repository<Destination>(context) { }
