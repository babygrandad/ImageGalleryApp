using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class UpdateCommentDTO
    {
        public string CommentContent { get; set; }
        public DateTime LastUpdate { get; set; } = DateTime.Now;
    }
}