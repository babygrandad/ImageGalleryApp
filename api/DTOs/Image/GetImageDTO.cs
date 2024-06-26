using api.DTOs.Category;
using api.DTOs.Comment;
using api.DTOs.Tag;

namespace api.DTOs.Image
{
    //DTO fo a single image
    public class GetImageDTO
    {
        public int ImageID { get; set; }
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

    public class GetImagesDTO
    {
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public DateTime UploadDate { get; set; }
        public string ImageURL { get; set; }
        public string FullName { get; set; }
        public List<GetCategoryDTO> Categories { get; set; } // List of CategoryDTOs
        public List<GetTagDTO> Tags { get; set; } // List of TagDTOs
        public int LikesCount { get; set; }
        public int CommentCount { get; set; }
    }

    public class GetImageFromUpdateDTO
    {
        public int ImageID { get; set; }
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

    public class GetImageFromCreateDTO
    {
        public int ImageID { get; set; }
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