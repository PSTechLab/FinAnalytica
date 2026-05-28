using ErrorOr;
using FinAnalytica.API.Helpers;
using FinAnalytica.API.Models;
using FinAnalytica.API.Repository.UserRepository;

namespace FinAnalytica.API.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }
        public async Task<ErrorOr<string?>> LoginAsync(string email, string password)
        {
            // fetch user by email
            var user = await _userRepository.GetByEmailAsync(email);

            // validate existence and password
            if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.Password))            
                return Error.Unauthorized(description: "Invalid email or password.");

            // generate JWT token
            var secretKey = _config["Jwt:Key"];
            if(string.IsNullOrEmpty(secretKey))
                return Error.Failure(description: "JWT secret key is not configured.");

            return TokenHelper.GenerateToken(user, secretKey);
        }

        public async Task<ErrorOr<bool>> RegisterAsync(string email, string password)
        {
            // check if user already exists
            if (await _userRepository.DoesEmailExistAsync(email))
                return Error.Conflict(description: "Email is already registered.");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

            var user = new User
            {
                Email = email,
                Password = passwordHash
            };

            await _userRepository.AddAsync(user);
            return true;
        }
    }
}
