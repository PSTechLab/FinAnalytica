using FinAnalytica.API.Models;

namespace FinAnalytica.API.Repository.TransactionRepository
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<Transaction>> GetAllAsync();
        Task AddAsync(Transaction transaction);
        Task SaveChangesAsync();
    }
}
