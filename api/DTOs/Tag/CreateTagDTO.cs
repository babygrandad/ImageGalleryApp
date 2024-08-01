using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Tag
{
    public class CreateTagDTO
    {
        public List<string> Tags { get; set; } = new List<string>();
    }
}