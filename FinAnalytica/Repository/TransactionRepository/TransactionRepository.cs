using FinAnalytica.API.Data;
using FinAnalytica.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FinAnalytica.API.Repository.TransactionRepository
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _dbContext;

        public TransactionRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Transaction>> GetAllAsync()
        {
            return await _dbContext.Transactions.ToListAsync();
        }

        public async Task AddAsync(Transaction transaction)
        {
            await _dbContext.Transactions.AddAsync(transaction);
        }

        public async Task SaveChangesAsync()
        {
            // Here is where we catch "Infrastructure" exceptions
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                // In a real-world app, you'd log the exception here: _logger.LogError(ex, ...);
                throw new Exception("Database could not be updated.", ex);
            }
        }
    }
}
