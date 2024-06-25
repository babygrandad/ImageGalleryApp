using api.DTOs.Account;
using api.interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class Accountontroller : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        //private readonly IEmailSender _emailSender;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public Accountontroller(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var appUser = new AppUser
                {
                    UserName = registerDTO.UserName,
                    Email = registerDTO.Email,
                    FullName = registerDTO.FullName,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new UserDTO
                            {
                                UserName = appUser.UserName,
                                FullName = appUser.UserName,
                                Email = appUser.Email,
                                Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e) // Catch any exceptions that occur during the process
            {
                return StatusCode(500, e); // Return 500 Internal Server Error with the exception details
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid) // Check if the model state is valid
            {
                return BadRequest(ModelState); // Return 400 Bad Request if model state is invalid
            }

            // Find user by Email (converted to lowercase)
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email.ToLower());

            if (user == null) // Check if user exists
            {
                return Unauthorized("Invalid Email or Password."); // Return 401 Unauthorized if user not found
            }

            // Check if the password is correct
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) // Check if the sign-in was successful
            {
                return Unauthorized("Invalid Email or Password."); // Return 401 Unauthorized if password is incorrect
            }

            // Return user data and token if login is successful
            return Ok(
                new UserDTO
                {
                    UserName = user.UserName, // Set username
                    Email = user.Email, // Set email address
                    FullName = user.FullName,
                    Token = _tokenService.CreateToken(user) // Generate and set token
                }
            );
        }
    }
}