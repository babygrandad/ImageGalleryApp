
using api.Data;
using api.DTOs.Image;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public ImageRepository(ApplicationDBContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<Image?> DeleteAsync(int id, AppUser user)
        {
            var image = await _dbContext.Images.FindAsync(id);

            if (image == null)
            {
                return null;
            }

            if (image.UserID != user.Id)
            {
                throw new UnauthorizedAccessException("User not autherized to delete this image.");
            }

            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();
            return image;
        }

        public async Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery)
        {
            // Initialize the queryable images including the necessary navigational properties
            var images = _dbContext.Images
                .Include(i => i.Likes)
                .Include(c => c.AppUser)
                .Include(x => x.Comments)
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.Category) // Directly include Category
                .AsSplitQuery()  // Apply query splitting here
                .AsQueryable();

            // Filter by image name if provided
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

            // Filter by category if provided
            if (!string.IsNullOrWhiteSpace(filterQuery.Category))
            {
                var categoryLower = filterQuery.Category.ToLower(); // Ensure case-insensitive comparison
                images = images.Where(x => x.Category.CategoryName.ToLower().Contains(categoryLower));
            }

            // Sorting based on SortBy and IsDescending properties
            if (!string.IsNullOrWhiteSpace(filterQuery.SortBy))
            {
                if (filterQuery.SortBy.Equals("ImageName", StringComparison.OrdinalIgnoreCase))
                {
                    images = filterQuery.IsDescending ? images.OrderByDescending(x => x.ImageName) : images.OrderBy(x => x.ImageName);
                }
                // Add additional sorting options as needed
            }
            else
            {
                // Default sorting to ensure correct Skip and Take functionality
                images = images.OrderByDescending(x => x.UploadDate);
            }

            var skipNumber = (filterQuery.PageNumber - 1) * filterQuery.PageSize;

            return await images.Skip(skipNumber).Take(filterQuery.PageSize).ToListAsync();
        }

        public async Task<List<Image>> GetMyImagesAsync(QueryObject filterQuery, AppUser user)
        {
            // Initialize the queryable images including the necessary navigational properties
            var images = _dbContext.Images
                .Include(i => i.Likes)
                .Include(c => c.AppUser)
                .Include(x => x.Comments)
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.Category) // Directly include Category
                .AsSplitQuery()  // Apply query splitting here
                .Where(i => i.UserID == user.Id)
                .AsQueryable();

            // Filter by image name if provided
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

            // Filter by category if provided
            if (!string.IsNullOrWhiteSpace(filterQuery.Category))
            {
                var categoryLower = filterQuery.Category.ToLower(); // Ensure case-insensitive comparison
                images = images.Where(x => x.Category.CategoryName.ToLower().Contains(categoryLower));
            }

            // Sorting based on SortBy and IsDescending properties
            if (!string.IsNullOrWhiteSpace(filterQuery.SortBy))
            {
                if (filterQuery.SortBy.Equals("ImageName", StringComparison.OrdinalIgnoreCase))
                {
                    images = filterQuery.IsDescending ? images.OrderByDescending(x => x.ImageName) : images.OrderBy(x => x.ImageName);
                }
                // Add additional sorting options as needed
            }
            else
            {
                // Default sorting to ensure correct Skip and Take functionality
                images = images.OrderByDescending(x => x.UploadDate);
            }

            var skipNumber = (filterQuery.PageNumber - 1) * filterQuery.PageSize;

            return await images.Skip(skipNumber).Take(filterQuery.PageSize).ToListAsync();
        }

        public async Task<int> GetTotalImagesCountAsync(QueryObject filterQuery)
        {
            var images = _dbContext.Images
                .Include(c => c.AppUser)
                .Include(x => x.Comments)
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterQuery.Name))
            {
                images = images.Where(x => x.ImageName.Contains(filterQuery.Name));
            }

            if (!string.IsNullOrWhiteSpace(filterQuery.Tag))
            {
                var tagLower = filterQuery.Tag.ToLower();
                images = images.Where(x => x.ImageTags.Any(tag => tag.Tag.TagName.ToLower().Contains(tagLower)));
            }

            if (!string.IsNullOrWhiteSpace(filterQuery.Category))
            {
                var categoryLower = filterQuery.Category.ToLower();
                images = images.Where(x => x.Category.CategoryName.ToLower().Contains(categoryLower));
            }

            return await images.CountAsync();
        }

        public async Task<int> GetMyImagesCountAsync(QueryObject filterQuery, AppUser user)
        {
            var images = _dbContext.Images
                .Include(c => c.AppUser)
                .Include(x => x.Comments)
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.Category)
                .AsSplitQuery()
                .Where(i => i.UserID == user.Id)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(filterQuery.Name))
            {
                images = images.Where(x => x.ImageName.Contains(filterQuery.Name));
            }

            if (!string.IsNullOrWhiteSpace(filterQuery.Tag))
            {
                var tagLower = filterQuery.Tag.ToLower();
                images = images.Where(x => x.ImageTags.Any(tag => tag.Tag.TagName.ToLower().Contains(tagLower)));
            }

            if (!string.IsNullOrWhiteSpace(filterQuery.Category))
            {
                var categoryLower = filterQuery.Category.ToLower();
                images = images.Where(x => x.Category.CategoryName.ToLower().Contains(categoryLower));
            }

            return await images.CountAsync();
        }

        public async Task<Image?> GetImageByIdAsync(int id)
        {
            var image = await _dbContext.Images
                .Include(c => c.AppUser)
                .Include(i => i.Comments)
                    .ThenInclude(c => c.AppUser) // Include AppUser for Comments
                .Include(i => i.ImageTags)
                    .ThenInclude(it => it.Tag)
                .Include(i => i.Category) // Directly include Category
                .AsSplitQuery() // Use query splitting
                .FirstOrDefaultAsync(i => i.ImageID == id);

            return image;
        }

        public Task<bool> ImageExit(int id)
        {
            return _dbContext.Images.AnyAsync(x => x.ImageID == id);
        }

        public async Task<Image?> PostImageAsync(CreateImageDTO createImageDTO, AppUser user) // finsh the tags post then come back here
        {
            var tagIds = new List<int>();

            var image = new Image
            {
                UserID = user.Id,
                ImageName = createImageDTO.ImageName,
                ImageDescription = createImageDTO.ImageDescription,
                ImageURL = createImageDTO.ImageURL,
                ImageDeleteURL = createImageDTO.ImageDeleteURL,
                ImageThumbnailURL = createImageDTO.ImageThumbnailURL,
                ImageDimensions = createImageDTO.ImageDimensions,
                CategoryID = createImageDTO.ImageCategory,
                FileSize = createImageDTO.FileSize,
                DateCaptured = createImageDTO.DateCaptured,
                Make = createImageDTO.Make,
                Model = createImageDTO.Model,
                LenseType = createImageDTO.LenseType
            };

            _dbContext.Images.Add(image);

            await _dbContext.SaveChangesAsync();

            foreach (var tagName in createImageDTO.ImageTags)
            {
                // Check if the tag already exists in the Tags table
                var existingTag = await _dbContext.Tags
                    .FirstOrDefaultAsync(t => t.TagName == tagName);

                int tagId;

                if (existingTag != null)
                {
                    // If the tag exists, use its ID
                    tagId = existingTag.TagID;
                }
                else
                {
                    // If the tag doesn't exist, add it to the Tags table
                    var newTag = new Tag { TagName = tagName };
                    _dbContext.Tags.Add(newTag);
                    await _dbContext.SaveChangesAsync(); // Save to get the new ID
                    tagId = newTag.TagID;
                }

                tagIds.Add(tagId);
            }

            foreach (var tagId in tagIds)
            {
                var imageTag = new ImageTag
                {
                    ImageID = image.ImageID, // This will have the assigned ID from SaveChangesAsync
                    TagID = tagId
                };
                _dbContext.ImageTags.Add(imageTag);
            }

            // Save the ImageTag associations
            await _dbContext.SaveChangesAsync();

            return image;
        }

        public async Task<Image?> UpdateImageAsync(int id, UpdateImageDTO updateImageDTO, AppUser user)
        {
            var existingImage = await _dbContext.Images.FindAsync(id);

            if (existingImage == null)
            {
                return null;
            }

            if (existingImage.UserID != user.Id)
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