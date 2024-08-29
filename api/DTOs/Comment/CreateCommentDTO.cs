using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class CreateCommentDTO
    {
        public string CommentContent { get; set; } =string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public DateTime LastUpdate { get; set;} = DateTime.Now;
    }
}