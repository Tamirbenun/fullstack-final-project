using DAL.Models;

namespace DAL.Data;

public class TicketsRepository(ContextDAL context) : Repository<Ticket>(context) {}
