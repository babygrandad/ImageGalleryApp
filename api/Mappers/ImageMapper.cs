using System.Linq;
using api.DTOs.Image;
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
                UserID = imageModel.UserID,
                ImageName = imageModel.ImageName,
                ImageDescription = imageModel.ImageDescription,
                UploadDate = imageModel.UploadDate,
                LastUpdated = imageModel.LastUpdated,
                ImageURL = imageModel.ImageURL,
                Comments = imageModel.Comments.Select(x => x.ToGetCommentDTO()).ToList()
                // Populate other properties as needed
            };
        }
    }
}
