using FinAnalytica.API.DTOs.Auth;
using FinAnalytica.API.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

namespace FinAnalytica.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string email, string password)
        {
            var result = await _authService.RegisterAsync(email, password);

            return result.Match(
                success => Ok(new { Message = "User registered successfully." }),
                errors => Problem(detail: errors.First().Description)
                );
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto user)
        {
            var result = await _authService.LoginAsync(user.Email, user.Password);

            return result.Match(
                success => Ok(new { Token = success }),
                errors => Problem(detail: errors.First().Description)
                );
        }
    }
}
