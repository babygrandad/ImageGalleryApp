using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly ICommentRepository _commentRepo;
        private readonly IImageRepository _imageRepo;
        private readonly UserManager<AppUser> _userManager;

        public CommentController(ApplicationDBContext dbContext, ICommentRepository commentRepo, UserManager<AppUser> userManager, IImageRepository imageRepo)
        {
            _dbContext = dbContext;
            _commentRepo = commentRepo;
            _userManager = userManager;
            _imageRepo = imageRepo;
        }

        [HttpPost("{ImageId:int}")]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromRoute] int ImageId, CreateCommentDTO createCommentDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!await _imageRepo.ImageExit(ImageId))
                return BadRequest("Image does not exist.");

            var userEmail = User.GetUserEmail(); // from the claims extention

            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("Email is missing from the claims.");
            }

            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var userId = user.Id;

            var commentModel = createCommentDTO.ToCommentFromCreate(ImageId);
            commentModel.UserID = userId; // Set the UserId here
            commentModel.ImageID = ImageId; // Ensure ImageID is set
            await _commentRepo.CreateAsync(commentModel);
            return CreatedAtAction(nameof(GetById), new { id = commentModel.CommentID }, commentModel.ToGetCommentDTO()); // Return 201 Created response with the location header
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        { // Asynchronous method to get a comment by ID

            if (!ModelState.IsValid) // Check if the model state is valid
            {
                return BadRequest(ModelState); // Return 400 Bad Request if model state is invalid
            }

            var comment = await _commentRepo.GetCommentByID(id); // Fetch the comment by ID from the repository

            if (comment == null) // Check if the comment exists
            {
                return NotFound("comment not found"); // Return 404 Not Found if the comment does not exist
            }

            return Ok(comment.ToGetCommentDTO()); // Convert the comment model to DTO and return with a 200 OK response
        }

        [HttpPatch("{commentId:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment([FromRoute] int commentId, [FromBody] UpdateCommentDTO updateCommentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if comment exits 
            var comment = await _commentRepo.GetCommentByID(commentId);
            if (comment == null) // Check if the comment exists
            {
                return NotFound("comment not found"); // Return 404 Not Found if the comment does not exist
            }

            // get email from claims
            var userEmail = User.GetUserEmail();
            if (string.IsNullOrEmpty(userEmail))
            {
                return Unauthorized("Email is missing from the claims.");
            }

            // use email to get userId
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            var userId = user.Id;

            try
            {
                var updatedComment = await _commentRepo.UpdateCommentAsync(commentId, updateCommentDTO, userId);
                if (updatedComment == null)
                {
                    return NotFound();
                }

                return Ok(updatedComment.ToGetCommentDTO());
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("User is not authorized to update this comment.");
            }
        }

        [HttpDelete("{commentId:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment([FromRoute] int commentId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var comment = await _commentRepo.GetCommentByID(commentId);
            if (comment == null)
            {
                return NotFound("Comment not found");
            }

            var userEmail = User.GetUserEmail();
            if (userEmail == null)
            {
                return Unauthorized("User not found");
            }

            var appUser = await _userManager.FindByEmailAsync(userEmail);
            if (appUser == null)
            {
                return Unauthorized("User not found");
            }

            try
            {
                await _commentRepo.DeleteCommentAsync(appUser, commentId);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "A problem happened while handling your request.");
            }

            return Ok("Comment deleted.");
        }

    }
}