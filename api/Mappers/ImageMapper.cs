using System.Linq;
using api.DTOs.Category;
using api.DTOs.Image;
using api.DTOs.Tag;
using api.Models;

namespace api.Mappers
{
    public static class ImageMapper
    {
        public static GetImageDTO ToGetImageDTO(this Image imageModel)
        {
            if (imageModel == null)
            {
                return null;
            }

            return new GetImageDTO
            {
                ImageID = imageModel.ImageID,
                FullName = imageModel.AppUser.FullName,
                ImageName = imageModel.ImageName,
                ImageDescription = imageModel.ImageDescription,
                UploadDate = imageModel.UploadDate,
                LastUpdated = imageModel.LastUpdated,
                ImageURL = imageModel.ImageURL,
                Comments = imageModel.Comments.Select(x => x.ToGetCommentDTO()).ToList(),
                Tags = imageModel.ImageTags.Select(it => new GetTagDTO{TagName = it.Tag.TagName}).ToList(),
                Categories = imageModel.ImageCategories.Select(it => new GetCategoryDTO{CategoryName = it.Category.CategoryName}).ToList(),
                // Populate other properties as needed
            };
        }
    }
}
