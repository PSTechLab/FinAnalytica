using FinAnalytica.API.Models;

namespace FinAnalytica.API.Repository
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetAllAsync();
        Task AddAsync(Transaction transaction);
        Task SaveChangesAsync();
    }
}
