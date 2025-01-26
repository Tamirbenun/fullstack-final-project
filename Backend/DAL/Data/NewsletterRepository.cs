using DAL.Models;

namespace DAL.Data;

public class NewsletterRepository(ContextDAL context) : Repository<Newsletter>(context) {}
