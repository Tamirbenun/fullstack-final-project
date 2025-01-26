using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class Newsletter
    {
        [Key]
        public string Email { get; set; }
        public DateTime JoiningDate { get; set; }
    }
}
