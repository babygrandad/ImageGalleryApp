using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class PasswordHistoryService : IPasswordHistoryService
    {
        private readonly ApplicationDBContext _dbContext;

        public PasswordHistoryService(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<PasswordHistory> AddPasswordAsync(string userID, string hashedPassword)
        {
            var passwordHistory = new PasswordHistory
            {
                UserID = userID,
                HashedPassword = hashedPassword,
                ChangedDate = DateTime.UtcNow
            };
            _dbContext.PasswordHistories.Add(passwordHistory);
            await _dbContext.SaveChangesAsync();

            return passwordHistory;
        }

        public async Task<bool> IsPasswordReusedAsync(string userId, string hashedPassword, TimeSpan period)
        {
            var cutoffDate = DateTime.UtcNow - period;
            var passwordHistories = await _dbContext.PasswordHistories
                .Where(ph => ph.UserID == userId && ph.ChangedDate >= cutoffDate)
                .ToListAsync();

            foreach (var passwordHistory in passwordHistories)
            {

                // Please investigate this if it will work with the current hashing method.
                var result = new PasswordHasher<AppUser>().VerifyHashedPassword(null, passwordHistory.HashedPassword, hashedPassword);
                if (result == PasswordVerificationResult.Success)
                {
                    return true;
                }
            }
            return false;
        }
    }
}