using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.Image
{
    public class CreateImageDTO
    {
        [Required]
        public string ImageName { get; set; }

        [Required]
        public string ImageDescription { get; set; }

        [Required]
        public string ImageURL { get; set; }

        [Required]
        public string ImageDeleteURL { get; set; }

        [Required]
        public string ImageDimensions { get; set; }

        [Required]
        public int ImageCategory { get; set; }

        [Required]
        public string FileSize { get; set; }

        
        public DateTime? DateCaptured { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? LenseType { get; set; }

        [Required]
        public List<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
    }
}