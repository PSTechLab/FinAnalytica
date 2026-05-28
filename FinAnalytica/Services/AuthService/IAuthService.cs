using ErrorOr;

namespace FinAnalytica.API.Services.AuthService
{
    public interface IAuthService
    {
        Task<ErrorOr<string?>> LoginAsync(string email, string password);
        Task<ErrorOr<bool>> RegisterAsync(string email, string password);
    }
}
