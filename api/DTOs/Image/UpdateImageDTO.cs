using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace api.DTOs.Image
{
    public class UpdateImageDTO
    {
        public string? ImageName { get; set; }
        public string? ImageDescription { get; set; }
        public DateTime LastUpdated { get; set; } = DateTime.Now;
    }
}