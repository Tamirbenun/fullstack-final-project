using DAL.Models;

namespace DAL.Data;

public class NotificationsRepository(ContextDAL context) : Repository<Notification>(context) {}
