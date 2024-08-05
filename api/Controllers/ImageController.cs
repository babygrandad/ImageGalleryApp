using System.Threading.Tasks;
using api.Data;
using api.DTOs.Image;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using api.Extensions;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly IImageRepository _imageRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public ImageController(
            IImageRepository imageRepo,
            ApplicationDBContext dbContext,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager)
        {
            _imageRepo = imageRepo;
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        public async Task<IActionResult> Getall([FromQuery] QueryObject filterQuery)
        {
            var image = await _imageRepo.GetAllImagesAsync(filterQuery);
            var imageDTO = image.Select(x => x.ToGetImagesDTO());
            return Ok(imageDTO);

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostImage([FromBody] CreateImageDTO createImageDTO) // Create interface and repository for this route
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var userEmail = User.GetUserEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null) return Unauthorized ("user not found");

            var imageUplad = await _imageRepo.PostImageAsync(createImageDTO, user);

            if (imageUplad == null) return BadRequest("Failed to upload image. Please try again");

            return Ok("Image successfully uploaded.");
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

        // Continue to make the update route for image details
        [HttpPatch]
        [Route("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateImage([FromRoute] int id, [FromBody] UpdateImageDTO updateImageDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEmail = User.GetUserEmail();
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("Email is missing from the claims.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            try
            {
                var imageModel = await _imageRepo.UpdateImageAsync(id, updateImageDTO, user);
                if (imageModel == null)
                {
                    return NotFound();

                }
                return Ok(imageModel.ToGetImageDTO());
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("User is not authorized to update this comment.");
            }

        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEmail = User.GetUserEmail();
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("Email is missing from the claims.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            try
            {
                var imageModel = await _imageRepo.DeleteAsync(id,user);
                if (imageModel == null)
                {
                    return NotFound();
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }

            return Ok("Image was successfully deleted.");
        }

    }
}
