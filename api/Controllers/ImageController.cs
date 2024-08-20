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
        private readonly ILikeRepository _likeRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public ImageController(
            IImageRepository imageRepo,
            ApplicationDBContext dbContext,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ILikeRepository likeRepo)
        {
            _imageRepo = imageRepo;
            _dbContext = dbContext;
            _userManager = userManager;
            _signInManager = signInManager;
            _likeRepo = likeRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Getall([FromQuery] QueryObject filterQuery)
        {
            var images = await _imageRepo.GetAllImagesAsync(filterQuery);
            var totalCount = await _imageRepo.GetTotalImagesCountAsync(filterQuery);
            var imageDTO = images.Select(x => x.ToGetImagesDTO());

            var response = new
            {
                TotalCount = totalCount,
                filterQuery.PageNumber,
                filterQuery.PageSize,
                Data = imageDTO,
            };

            return Ok(response);
        }

        [HttpGet("mylibrary")]
        [Authorize]
        public async Task<IActionResult> GetMyImages([FromQuery] QueryObject filterQuery)
        {
            var userEmail = User.GetUserEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            var images = await _imageRepo.GetMyImagesAsync(filterQuery, user);
            var totalCount = await _imageRepo.GetMyImagesCountAsync(filterQuery, user);
            var imageDTO = images.Select(x => x.ToGetImagesDTO());

            var response = new
            {
                TotalCount = totalCount,
                filterQuery.PageNumber,
                filterQuery.PageSize,
                Data = imageDTO,
            };

            return Ok(response);

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostImage([FromBody] CreateImageDTO createImageDTO) // Create interface and repository for this route
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var userEmail = User.GetUserEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null) return Unauthorized ("user not found");

            var imageUpload = await _imageRepo.PostImageAsync(createImageDTO, user);

            if (imageUpload == null) return BadRequest("Failed to upload image. Please try again");

            return Ok("Image successfully uploaded.");
        }

        [HttpGet("{id:int}")]
        [Authorize]
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

            var likeCount = await _likeRepo.GetLikesByIdAsync(id);
            if (likeCount == null)
            {
                return NotFound();
            }

            return Ok(image.ToGetImageDTO());
        }

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
