using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Account
{
    public class UserDTO
    {
        public string  UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
    }
}