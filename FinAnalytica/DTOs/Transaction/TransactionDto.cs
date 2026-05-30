using FinAnalytica.API.Enums;

namespace FinAnalytica.API.DTOs.Transaction
{
    public class TransactionDto
    {
        public string ClientName { get; set; }

        public Category Category { get; set; }

        public decimal Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public Status Status { get; set; }

        public RiskLevel RiskLevel { get; set; }

    }
}
