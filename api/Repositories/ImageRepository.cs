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

namespace api.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public ImageRepository(ApplicationDBContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public Task<Image?> DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Image>> GetAllImagesAsync(QueryObject filterQuery)
        {
            throw new NotImplementedException();
        }

        public async Task<Image?> GetImageByIdAsync(int id)
        {
           var image = await _dbContext.Images.Include(x => x.Comments).FirstOrDefaultAsync(i => i.ImageID == id);
           
        }

        public Task<Image?> PostImageAsync(Image imageModel)
        {
            throw new NotImplementedException();
        }

        public Task<Image?> UpdateImage(string id, UpdateImageDTO updateImageDTO)
        {
            throw new NotImplementedException();
        }
    }
}