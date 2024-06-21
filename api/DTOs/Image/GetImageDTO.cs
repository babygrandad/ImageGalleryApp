using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Category;
using api.DTOs.Comment;
using api.DTOs.Tag;




namespace api.DTOs.Image
{
    public class GetImageDTO
    {
        public int ImageID { get; set; }
        public string UserID { get; set; }
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime LastUpdated { get; set; }
        public string ImageURL { get; set; }
        public string FullName { get; set; }
        public List<GetCategoryDTO> Categories { get; set; } // List of CategoryDTOs
        public List<GetTagDTO> Tags { get; set; } // List of TagDTOs
        public int LikesCount { get; set; }
        public List<GetCommentDTO> Comments { get; set; } // List of comments
    }

}