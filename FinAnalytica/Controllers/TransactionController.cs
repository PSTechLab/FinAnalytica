using FinAnalytica.API.Models;
using FinAnalytica.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FinAnalytica.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
        {
            var result = await _transactionService.CreateTransactionAsync(transaction);

            return result.Match(
                success => CreatedAtAction(nameof(GetAllTransactions), new { id = success.Id }, success),
                errors => Problem(detail: errors.First().Description, statusCode: 400)
            );
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return Ok(transactions);
        }
    }
}
