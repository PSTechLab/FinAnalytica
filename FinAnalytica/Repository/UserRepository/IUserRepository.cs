using FinAnalytica.API.Models;

namespace FinAnalytica.API.Repository.UserRepository
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> DoesEmailExistAsync(string email);
        Task AddAsync(User user);
    }
}
