using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Tags")]
    public class Tag
    {
        public int TagID { get; set; }
        public string TagName { get; set; }
        public ICollection<ImageTag> ImageTags { get; set; }
    }
}