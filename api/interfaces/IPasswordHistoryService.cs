using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IPasswordHistoryService
    {
        Task<PasswordHistory> AddPasswordAsync(string userID, string hashedPassword);
        Task<bool> IsPasswordReusedAsync(string userId, string hashedPassword, TimeSpan period);
    }
}