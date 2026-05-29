using System.ComponentModel.DataAnnotations;

namespace FinAnalytica.API.DTOs.Auth
{
    public class LoginRequestDto
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
