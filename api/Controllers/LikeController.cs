using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LikeController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILikeRepository _likeReop;

        public LikeController(
            UserManager<AppUser> userManager,
            ILikeRepository likeReop
        )
        {
            _userManager = userManager;
            _likeReop = likeReop;
        }

        [HttpPost("{imageId:int}")]
        [Authorize]
        public async Task<IActionResult> LikeToggle([FromRoute] int imageId)
        {
            var userEmail = User.GetUserEmail();
            var user = await _userManager.FindByEmailAsync(userEmail);
            var isLiked = await _likeReop.ToggleLikeAsync(user.Id, imageId);

            if (isLiked)
            {
                return Ok("Image liked.");
            }
            else
            {
                return Ok("Image unliked.");
            }
        }

    }
}