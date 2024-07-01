using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Image;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace api.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public ImageRepository(ApplicationDBContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<Image?> DeleteAsync(int id)
        {
            var image = await _dbContext.Images.FindAsync(id);

            if (image == null)
            {
                return null;
            }

            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery)
        {
            // Initialize the queryable images including the necessary navigational properties
            var images = _dbContext.Images
                .Include(c => c.AppUser)
                .Include(x => x.Comments)
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.ImageCategories)
                    .ThenInclude(ic => ic.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterQuery.Name))
            {
                images = images.Where(x => x.ImageName.Contains(filterQuery.Name));
            }

            // Filter by tag if provided
            if (!string.IsNullOrWhiteSpace(filterQuery.Tag))
            {
                var tagLower = filterQuery.Tag.ToLower(); // Ensure case-insensitive comparison
                images = images.Where(x => x.ImageTags.Any(tag => tag.Tag.TagName.ToLower().Contains(tagLower)));
            }

            // Filter by tag if provided
            if (!string.IsNullOrWhiteSpace(filterQuery.Category))
            {
                var categoryLower = filterQuery.Category.ToLower(); // Ensure case-insensitive comparison
                images = images.Where(x => x.ImageCategories.Any(cat => cat.Category.CategoryName.ToLower().Contains(categoryLower)));
            }

            // Sorting based on SortBy and IsDescending properties
            if (!string.IsNullOrWhiteSpace(filterQuery.SortBy))
            {
                if (filterQuery.SortBy.Equals("ImageName", StringComparison.OrdinalIgnoreCase))
                {
                    images = filterQuery.IsDescending ? images.OrderByDescending(x => x.ImageName) : images.OrderBy(x => x.ImageName);
                }
            }

            var skipNumber = (filterQuery.PageNumber - 1) * filterQuery.PageSize;

            return await images.Skip(skipNumber).Take(filterQuery.PageSize).ToListAsync();
        }

        public async Task<Image?> GetImageByIdAsync(int id)
        {
            var image = await _dbContext.Images
                .Include(i => i.Comments)
                    .ThenInclude(c => c.AppUser) // Ensure AppUser is included
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.ImageCategories)
                    .ThenInclude(ic => ic.Category)
                .FirstOrDefaultAsync(i => i.ImageID == id);

            if (image == null)
            {
                return null;
            }

            return image;
        }

        public Task<bool> ImageExit(int id)
        {
            return _dbContext.Images.AnyAsync(x => x.ImageID == id);
        }

        public Task<Image?> PostImageAsync(Image imageModel)
        {
            throw new NotImplementedException();
        }

        public async Task<Image?> UpdateImageAsync(int id, UpdateImageDTO updateImageDTO, AppUser user)
        {
            var existingImage = await _dbContext.Images.FindAsync(id);

            if (existingImage == null)
            {
                return null;
            }

            if(existingImage.UserID != user.Id)
            {
                throw new UnauthorizedAccessException("user not autherized to update this comment");
            }

            existingImage.LastUpdated = updateImageDTO.LastUpdated;
            existingImage.ImageName = updateImageDTO.ImageName;
            existingImage.ImageDescription = updateImageDTO.ImageDescription;

            await _dbContext.SaveChangesAsync();
            return existingImage;
        }
    }
}