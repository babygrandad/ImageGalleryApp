using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class CreateCommentDTO
    {
        public string CommentContent { get; set; } =string.Empty;
        public DateTime CommentDate { get; set; }
        public DateTime LastUpdate { get; set;}
    }
}