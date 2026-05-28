using System.ComponentModel.DataAnnotations;

namespace FinAnalytica.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
