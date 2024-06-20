using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Comments")]
    public class Comment
    {
        public int CommentID { get; set; }
        public int ImageID { get; set; } // Foreign Key to Image
        public string UserID { get; set; } // Foreign Key to User
        public string CommentContent { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public DateTime LastUpdate { get; set; } = DateTime.Now;
        public bool IsEdited { get; set; }

        public Image Image { get; set; }
        public AppUser AppUser { get; set; }
    }
}