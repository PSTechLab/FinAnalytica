using FinAnalytica.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FinAnalytica.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<User> Users {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Always call the base method first to ensure default behaviors are maintained
            base.OnModelCreating(modelBuilder);

            // Configure the User entity
            modelBuilder.Entity<User>(entity =>
            {
                // Ensure Email is required
                entity.Property(u => u.Email).IsRequired();

                // Create a unique index on the Email property
                entity.HasIndex(u => u.Email).IsUnique();

                entity.Property(u => u.Password).IsRequired();
            });
        }
    }
}
