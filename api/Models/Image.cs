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
        public DateTime LastUpdated { get; set; } = DateTime.Now;
        public string ImageURL { get; set; }

        public string ImageDimensions { get; set; } //  Exif Data - Image dimensions
        public string FileSize { get; set; } //  Exif Data - Image Size
        public DateTime? DateCapturted { get; set; } //  Exif Data - The day the image was capture
        public string? Make { get; set; } //  Exif Data - The Brand of the camera
        public string? Model { get; set; } //  Exif Data - The specific camera Model
        public string? LenseType { get; set; } //  Exif Data - The lense used to take the image

        public AppUser AppUser { get; set; }
        public List<ImageCategory> ImageCategories { get; set; } = new List<ImageCategory>();
        public List<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
        public List<Like> Likes { get; set; } = new List<Like>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
