using ErrorOr;
using FinAnalytica.API.Models;
using FinAnalytica.API.Repository.TransactionRepository;

namespace FinAnalytica.API.Services.TransactionService
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<ErrorOr<Transaction>> CreateTransactionAsync(Transaction transaction)
        {
            if (transaction.Amount <= 0)
            {
                return Error.Validation(code: "Transaction.InvalidAmount", description: "Transaction amount must be greater than zero.");
            }

            await _transactionRepository.AddAsync(transaction);
            await _transactionRepository.SaveChangesAsync();

            return transaction;
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync()
        {
            return await _transactionRepository.GetAllAsync();
        }

    }
}
