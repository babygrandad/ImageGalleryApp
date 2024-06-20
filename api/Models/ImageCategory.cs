using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("ImageCategories")]
   public class ImageCategory
{
    public int ImageCategoryID { get; set; }
    public int ImageID { get; set; } // Foreign Key to Image
    public int CategoryID { get; set; } // Foreign Key to Category

    public Image Image { get; set; }
    public Category Category { get; set; }
}
}