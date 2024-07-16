using api.DTOs.Account;
using api.Extensions;
using api.interfaces;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Web;

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
        private readonly ILogger<AccountController> _logger;

        public AccountController(
            UserManager<AppUser> userManager,
            ITokenService tokenService,
            SignInManager<AppUser> signInManager,
            IEmailService emailService,
            ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailService = emailService;
            _logger = logger;
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
                    var subject = "Confirm Your Email";
                    var message = $"Please confirm your email by clicking the following link: {confirmationLink}";
                    Console.WriteLine(emailToken);

                    try
                    {
                        await _emailService.SendEmailAsync(recipient, subject, message);
                    }
                    catch (Exception ex)
                    {
                        await _userManager.DeleteAsync(appUser); // Cleanup by deleting the created user
                        return StatusCode(500, "An error occurred while sending the confirmation email. Please try again.");
                    }

                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");

                    if (roleResult.Succeeded)
                    {
                        return Ok(new { message = "User registered successfully. Please check your email to confirm your account." });
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
                // Consider logging the exception (use a logging framework like Serilog, NLog, etc.)
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
                return Unauthorized(new { message = "Invalid email or password." }); // Return 401 Unauthorized if user not found
            }

            // Check if the email is confirmed
            if (!user.EmailConfirmed)
            {
                return Unauthorized(new { message = "Email is not confirmed." });
            }

            // Check if the password is correct
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            if (!result.Succeeded) // Check if the sign-in was successful
            {
                return Unauthorized(new { message = "Invalid email or password." }); // Return 401 Unauthorized if password is incorrect
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

            try
            {
                var user = await _userManager.FindByEmailAsync(forgotPasswordDTO.email);
                if (user == null)
                {
                    return BadRequest("User not found");
                }

                var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                var encodedToken = HttpUtility.UrlEncode(resetToken);
                if (resetToken == null)
                {
                    return StatusCode(500, "Could not generate reset token, please try again.");
                }

                var resetLink = $"http://localhost:5173/resetpassword?userId={user.Id}&token={encodedToken}";

                var recipient = forgotPasswordDTO.email;
                var subject = "Reset Password";
                var message = $"Please reset your password by clicking the following link: {resetLink}";

                await _emailService.SendEmailAsync(recipient, subject, message);

                return Ok("Password reset email sent successfully. Please check your Email for the link");
            }
            catch (Exception ex)
            {

                // Log the exception (consider using a logging framework like Serilog, NLog, etc.)
                _logger.LogError(ex, "Error occurred during user registration.");
                return StatusCode(500, "An error occurred while processing your request. Please try again later.");
            }
        }

        // Password change route 
        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            // Implement logic to change password
            return null;
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _userManager.FindByIdAsync(resetPasswordDTO.UserId);
                if (user == null)
                {
                    return BadRequest("Invalid user.");
                }

                var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description);
                    return BadRequest(new { Errors = errors });
                }

                return Ok("Password has been reset successfully. You can now log in");
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework like Serilog, NLog, etc.)
                return StatusCode(500, "An error occurred while processing your request. Please try again later.");
            }
        }


        // email verification route
        [HttpGet("ConfirmEmail")]
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
            else
            {
                // Handle failure
                return BadRequest(result.Errors);
            }
        }

    }
}