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
        Task<Image?> UpdateImageAsync(int id, UpdateImageDTO updateImageDTO, AppUser user);
        Task<Image?> PostImageAsync(Image imageModel);
        Task<Image?> DeleteAsync(int id);
        Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery);
        Task<bool> ImageExit(int id);
    }
}