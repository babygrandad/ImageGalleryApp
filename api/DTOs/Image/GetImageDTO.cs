using api.DTOs.Category;
using api.DTOs.Comment;
using api.DTOs.Like;
using api.DTOs.Tag;

namespace api.DTOs.Image
{
    // DTO for a single image
    public class GetImageDTO
    {
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string ImageURL { get; set; }
        public string ImageDeleteURL { get; set; }
        public string ImageThumbnailURL { get; set; }
        public string FullName { get; set; }
        public string ImageDimensions { get; set; } // Exif Data - Image dimensions
        public string FileSize { get; set; } // Exif Data - Image Size
        public DateTime? DateCaptured { get; set; } // Exif Data - The day the image was captured
        public string? Make { get; set; } // Exif Data - The brand of the camera
        public string? Model { get; set; } // Exif Data - The specific camera model
        public string? LenseType { get; set; } // Exif Data - The lens used to take the image
        public GetCategoryDTO Category { get; set; } // Single CategoryDTO
        public List<GetTagDTO> Tags { get; set; } // List of TagDTOs
        public int LikesCount { get; set; }
        public List<GetCommentDTO> Comments { get; set; } // List of comments
        public List<GetLikeDTO> Likes { get; set; }

    }

    public class GetImagesDTO
    {
        public int ImageID { get; set; }
        public string ImageName { get; set; }
        public string ImageDescription { get; set; }
        public string ImageThumbnailURL { get; set; }
        public DateTime UploadDate { get; set; }
        public string ImageURL { get; set; }
        public string FullName { get; set; }
        public GetCategoriesDTO Category { get; set; } // Single CategoryDTO
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
        public GetCategoryDTO Category { get; set; } // Single CategoryDTO
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
        public GetCategoryDTO Category { get; set; } // Single CategoryDTO
        public List<GetTagDTO> Tags { get; set; } // List of TagDTOs
        public int LikesCount { get; set; }
        public List<GetCommentDTO> Comments { get; set; } // List of comments
    }

}
