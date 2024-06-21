using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageControllers : ControllerBase
    {
        private readonly IImageRepository _imageRepo;
        private readonly ApplicationDBContext _dbContext;
        public ImageControllers(ApplicationDBContext dBContext, IImageRepository imageRepo)
        {
            _dbContext = dBContext;
            _imageRepo = imageRepo;
        }

        // make the controller for getImageById
    }
}