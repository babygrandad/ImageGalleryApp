using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Images")]
    public class Image
    {
        public int ImageID { get; set; }
        public string FullName { get; set; }
        public string UserID { get; set; } // Foreign Key to User
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public DateTime LastUpdated { get; set; } = DateTime.Now;
        public string ImageURL { get; set; }

        public AppUser AppUser { get; set; }
        public List<ImageCategory> ImageCategories { get; set; } = new List<ImageCategory>();
        public List<ImageTag> ImageTags { get; set; } = new List<ImageTag>();
        public List<Like> Likes { get; set; } = new List<Like>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
