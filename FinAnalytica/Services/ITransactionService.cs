using FinAnalytica.API.Models;
using ErrorOr;

namespace FinAnalytica.API.Services
{
    public interface ITransactionService
    {
        Task<ErrorOr<Transaction>> CreateTransactionAsync(Transaction transaction);
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
    }
}
