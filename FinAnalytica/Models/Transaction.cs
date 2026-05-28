using System.ComponentModel.DataAnnotations;

namespace FinAnalytica.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Required]
        public string ClientName { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; } = string.Empty;

        // We ensure the amount is recorded accurately with decimal
        public decimal Amount { get; set; }

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string Status { get; set; } = "Pending";

        public string RiskLevel { get; set; } = "Low";
    }
}
