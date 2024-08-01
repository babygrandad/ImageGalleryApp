using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Images")]
    public class Image
    {
        public int ImageID { get; set; }
        public string UserID { get; set; } // Foreign Key to User
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public DateTime? LastUpdated { get; set; }
        public string ImageURL { get; set; }
        public string ImageDeleteURL { get; set; }

        public string ImageDimensions { get; set; } // Exif Data - Image dimensions
        public string FileSize { get; set; } // Exif Data - Image Size
        public DateTime? DateCaptured { get; set; } // Exif Data - The day the image was captured
        public string? Make { get; set; } // Exif Data - The brand of the camera
        public string? Model { get; set; } // Exif Data - The specific camera model
        public string? LenseType { get; set; } // Exif Data - The lens used to take the image 

        public AppUser AppUser { get; set; }

        // Single Category
        public int CategoryID { get; set; }
        public Category Category { get; set; }

        public List<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
        public List<Like> Likes { get; set; } = new List<Like>();
        public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}