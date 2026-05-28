using FinAnalytica.API.Models;
using FinAnalytica.API.Repository;
using FinAnalytica.API.Services;
using NSubstitute;
using NSubstitute.ReceivedExtensions;

namespace FinAnalytica.Tests.Services
{
    public class TransactionServiceTests
    {
        private readonly ITransactionRepository _repositoryMock;
        private readonly TransactionService _sut;

        public TransactionServiceTests()
        {
            _repositoryMock = Substitute.For<ITransactionRepository>();
            _sut = new TransactionService(_repositoryMock);
        }

        [Fact]
        public async Task CreateTransactionAsync_WhenAmountIsZero_ReturnsValidationError()
        {
            //Arrange
            var invalidTransaction = new Transaction
            {
                Amount = 0,
                ClientName = "Test when amount is 0",
            };

            //Act
            var result = await _sut.CreateTransactionAsync(invalidTransaction);

            //Assert
            Assert.True(result.IsError);
            Assert.Equal("Transaction.InvalidAmount", result.FirstError.Code);
            Assert.Equal("Transaction amount must be greater than zero.", result.FirstError.Description);

            // Verify that the repository's CreateTransactionAsync method was never called
            await _repositoryMock.DidNotReceive().AddAsync(Arg.Any<Transaction>());
        }

        [Fact]
        public async Task CreateTransactionAsync_WhenAmountIsNegative_ReturnsValidationError()
        {
            //Arrange
            var invalidTransaction = new Transaction
            {
                Amount = -100,
                ClientName = "Test when amount is negative",
            };

            //Act
            var result = await _sut.CreateTransactionAsync(invalidTransaction);

            //Assert
            Assert.True(result.IsError);
            Assert.Equal("Transaction.InvalidAmount", result.FirstError.Code);
            Assert.Equal("Transaction amount must be greater than zero.", result.FirstError.Description);

            //Verify that the repository's CreateTransactionAsync method was never called
            await _repositoryMock.DidNotReceive().AddAsync(Arg.Any<Transaction>());
        }

        [Fact]
        public async Task CreateTransactionAsync_WhenAmountIsCorrect_ReturnsTransaction()
        {
            //Arrange
            var validTransaction = new Transaction
            {
                Amount = 100,
                ClientName = "Test when amount is correct",
            };

            //Act
            var result = await _sut.CreateTransactionAsync(validTransaction);

            //Assert
            Assert.True(!result.IsError);
            Assert.NotNull(result.Value);
            Assert.Equal(validTransaction, result.Value);

            //Verify that the repository's CreateTransactionAsync method was called once with the correct transaction
            await _repositoryMock.Received(1).AddAsync(validTransaction);
            await _repositoryMock.Received(1).SaveChangesAsync();
        }
    }
}
