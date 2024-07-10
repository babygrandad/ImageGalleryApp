using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            using (var client = new SmtpClient("localhost", 1025)) // MailHog SMTP server address and port
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("ImageAppGallery@example.com"), // Replace with your sender email address
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = false // Set to true if your message body is in HTML format
                };
                
                mailMessage.To.Add(email);

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}
