using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ILikeRepository
    {
        Task<Like?> ToggleLikeAsync(string userId, int imageId);
        Task<List<Like>> GetLikesByIdAsync(int imageId);
    }
}