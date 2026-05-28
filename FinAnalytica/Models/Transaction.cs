using FinAnalytica.API.Enums;
using System.ComponentModel.DataAnnotations;

namespace FinAnalytica.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        public string ClientName { get; set; }

        [Required]
        public Category Category { get; set; }

        // We ensure the amount is recorded accurately with decimal
        public decimal Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public Status Status { get; set; }

        public RiskLevel RiskLevel { get; set; }
    }
}
