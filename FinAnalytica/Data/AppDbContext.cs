using FinAnalytica.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FinAnalytica.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<User> Users {  get; set; }
    }
}
