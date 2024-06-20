using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("ImageTags")]
    public class ImageTag
    {
        public int ImageTagID { get; set; }
        public int ImageID { get; set; } // Foreign Key to Image
        public int TagID { get; set; } // Foreign Key to Tag

        public Image Image { get; set; } // Navigation property to Image
        public Tag Tag { get; set; } // Navigation property to Tag
    }
}