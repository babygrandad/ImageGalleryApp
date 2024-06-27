using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class GetCommentDTO
    {
        public int CommentID { get; set; }
        public string CommentContent { get; set; }
        public DateTime CommentDate { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool IsEdited { get; set; }
        //public string UserName { get; set; }
        public string FullName { get; set; }
        // Other properties as needed
    }
}