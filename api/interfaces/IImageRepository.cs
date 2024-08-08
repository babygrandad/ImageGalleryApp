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
        Task<Image?> PostImageAsync(CreateImageDTO createImageDTO, AppUser user);
        Task<Image?> DeleteAsync(int id, AppUser user);
        Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery);
        Task<int> GetTotalImagesCountAsync(QueryObject filterQuery);
        Task<bool> ImageExit(int id);
    }
}