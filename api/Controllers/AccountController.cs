using api.DTOs.Account;
using api.interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class Accountontroller : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        //private readonly IEmailSender _emailSender;
        private readonly ITokenService _tokenService;
        private readonly SignInManager <AppUser> _signInManager;

        public Accountontroller(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO registerDTO)
        {
            return null; 
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            return null;
        }
    }
}