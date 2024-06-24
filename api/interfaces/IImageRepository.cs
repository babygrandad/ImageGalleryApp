using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs.Image;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IImageRepository
    {
        Task<Image?> GetImageByIdAsync(int id);
        Task<Image?> UpdateImage(string id, UpdateImageDTO updateImageDTO);
        Task<Image?> PostImageAsync(Image imageModel);
        Task<Image?> DeleteAsync(string id);
        Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery);
    }
}