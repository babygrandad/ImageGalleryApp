using api.DTOs.Account;
using api.Extensions;
using api.interfaces;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailService _emailService;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager,
            IEmailService emailService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
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

                var existingUser = await _userManager.FindByEmailAsync(registerDTO.Email.ToLower());
                if (existingUser != null)
                {
                    return BadRequest(new { errors = new[] { "Email is already taken." } });
                }

                var appUser = new AppUser
                {
                    UserName = registerDTO.UserName,
                    Email = registerDTO.Email.ToLower(),
                    FullName = registerDTO.FullName,
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDTO.Password);

                if (createdUser.Succeeded)
                {

                    var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
                    var confirmationLink = Url.Action("ConfirmEmail",
                                                        "Account",
                                                        new
                                                        {
                                                            userId = appUser.Id,
                                                            token = emailToken
                                                        },
                                                        Request.Scheme);

                    var recipient = registerDTO.Email.ToLower();
                    var subject = "Test Mail";
                    var Message = confirmationLink;
                    await _emailService.SendEmailAsync(recipient, subject, Message);

                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        return Ok(
                            new UserDTO
                            {
                                UserName = appUser.UserName,
                                FullName = appUser.UserName,
                                Email = appUser.Email,
                                //Token = _tokenService.CreateToken(appUser)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, new { errors = roleResult.Errors.Select(e => e.Description) });
                    }
                }
                else
                {
                    return StatusCode(500, new { errors = createdUser.Errors.Select(e => e.Description) });
                }
            }
            catch (Exception e) // Catch any exceptions that occur during the process
            {
                return StatusCode(500, new { message = "An internal server error occurred.", exception = e.Message });
            }
        }

        // Login route for the user entity
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

        // Please dont forget to work on the logout route for the user
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logged out successfully" });
        }

        // work on this when you find a way to send the forgot email email.
        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return null;
        }

        // Password change route 
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            // Implement logic to change password
            return null;
        }

        // email verification route
        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return RedirectToAction("Index", "Home");
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email Confirmed");
            }
            else{
            // Handle failure
            return BadRequest(result.Errors);
            }
        }

    }
}