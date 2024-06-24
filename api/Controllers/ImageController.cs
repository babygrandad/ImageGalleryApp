using System.Threading.Tasks;
using api.Data;
using api.DTOs.Image;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IImageRepository _imageRepo;

        public ImageController(IImageRepository imageRepo, ApplicationDBContext dbContext)
        {
            _imageRepo = imageRepo;
            _dbContext = dbContext;
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(GetImageDTO), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetImage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var image = await _imageRepo.GetImageByIdAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return Ok(image.ToGetImageDTO());
        }
    }
}
