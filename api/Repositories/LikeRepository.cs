using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class LikeRepository : ILikeRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public LikeRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
        }
        public async Task<int> GetLikesByIdAsync(int imageId)
        {
            // Count the number of likes with the specified imageId
            var likeCount = await _dbContext.Likes
                .CountAsync(l => l.ImageID == imageId);

            return likeCount;
        }
        
        public async Task<Like?> ToggleLikeAsync(string userId, int imageId)
        {
            // Check if a like already exists
            var existingLike = await _dbContext.Likes
                .FirstOrDefaultAsync(l => l.UserID == userId && l.ImageID == imageId);

            if (existingLike != null)
            {
                // If it exists, remove the like (unlike)
                _dbContext.Likes.Remove(existingLike);
            }
            else
            {
                // If it doesn't exist, create a new like
                existingLike = new Like
                {
                    UserID = userId,
                    ImageID = imageId,
                    LikeDate = DateTime.Now,
                };

                await _dbContext.Likes.AddAsync(existingLike);
            }

            // Save changes regardless of whether we added or removed a like
            await _dbContext.SaveChangesAsync();

            return existingLike;
        }

    }
}