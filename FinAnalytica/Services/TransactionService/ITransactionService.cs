using FinAnalytica.API.Models;
using ErrorOr;

namespace FinAnalytica.API.Services.TransactionService
{
    public interface ITransactionService
    {
        Task<ErrorOr<Transaction>> CreateTransactionAsync(Transaction transaction);
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
    }
}
