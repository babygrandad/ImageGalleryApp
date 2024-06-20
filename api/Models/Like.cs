using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Likes")]
   public class Like
{
    public int LikeID { get; set; }
    public int ImageID { get; set; } // Foreign Key to Image
    public string UserID { get; set; } // Foreign Key to User
    public DateTime LikeDate { get; set; }

    public Image Image { get; set; }
    public AppUser AppUser { get; set; }
    }
}