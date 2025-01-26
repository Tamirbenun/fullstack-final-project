namespace PandaAPI.DTOs;

public class PaymentDetailsDto
{
    public string CardNumber { get; set; } = string.Empty;
    public string CardHolderName { get; set; } = string.Empty;
    public string ExpirationDate { get; set; } = string.Empty;
    public string CVV { get; set; } = string.Empty;
    public List<CreateTicketDto> Tickets { get; set; }
}