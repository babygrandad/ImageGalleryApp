using System.Linq;
using api.DTOs.Category;
using api.DTOs.Comment;
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
                FullName = imageModel.AppUser?.FullName,
                ImageName = imageModel.ImageName,
                ImageDescription = imageModel.ImageDescription,
                UploadDate = imageModel.UploadDate,
                LastUpdated = imageModel.LastUpdated,
                ImageURL = imageModel.ImageURL,
                Categories = imageModel.ImageCategories?.Select(ic => ic.Category.ToGetCategoryDTO()).ToList() ?? new List<GetCategoryDTO>(),
                Tags = imageModel.ImageTags?.Select(it => it.Tag.ToGetTagDTO()).ToList() ?? new List<GetTagDTO>(),
                LikesCount = imageModel.Likes?.Count ?? 0,
                Comments = imageModel.Comments?.Select(x => x.ToGetCommentDTO()).ToList() ?? new List<GetCommentDTO>()
                // Populate other properties as needed
            };
        }

        // plural
        public static GetImagesDTO ToGetImagesDTO(this Image imageModel)
        {
            if (imageModel == null)
            {
                return null;
            }

            return new GetImagesDTO
            {
                ImageID = imageModel.ImageID,
                FullName = imageModel.AppUser?.FullName,
                ImageName = imageModel.ImageName,
                ImageDescription = imageModel.ImageDescription,
                UploadDate = imageModel.UploadDate,
                ImageURL = imageModel.ImageURL,
                Categories = imageModel.ImageCategories?.Select(ic => ic.Category.ToGetCategoryDTO()).ToList() ?? new List<GetCategoryDTO>(),
                Tags = imageModel.ImageTags?.Select(it => it.Tag.ToGetTagDTO()).ToList() ?? new List<GetTagDTO>(),
                LikesCount = imageModel.Likes?.Count ?? 0,
                CommentCount = imageModel.Comments?.Count ?? 0,
                // Populate other properties as needed
            };
        }
    }
}
