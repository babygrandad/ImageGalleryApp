using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Categories")]
    public class Category
    {
        public int CategoryID { get; set; }
        public string CategoryName { get; set; } 

        // Navigation property for images in this category
        public List<Image> Images { get; set; } = new List<Image>();
    }
}