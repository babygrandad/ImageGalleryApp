Extracting and storing EXIF (Exchangeable Image File) data for images involves capturing various metadata details embedded within the image file. Common EXIF data includes information such as the camera settings, GPS coordinates, and other relevant details about how and where the image was taken.

Here are some common EXIF data fields you might want to store in your `Image` entity:

1. **Camera Make**: The manufacturer of the camera.
2. **Camera Model**: The model of the camera.
3. **Exposure Time**: The exposure time (shutter speed).
4. **FNumber**: The F-number (aperture value).
5. **ISO Speed Ratings**: The ISO speed.
6. **DateTimeOriginal**: The date and time when the photo was taken.
7. **Lens Make**: The manufacturer of the lens.
8. **Lens Model**: The model of the lens.
9. **Focal Length**: The focal length of the lens, in millimeters.
10. **GPSLatitude**: The latitude where the photo was taken.
11. **GPSLongitude**: The longitude where the photo was taken.
12. **GPSAltitude**: The altitude where the photo was taken.
13. **ImageWidth**: The width of the image in pixels.
14. **ImageHeight**: The height of the image in pixels.
15. **Orientation**: The orientation of the camera relative to the scene, typically represented by values such as "1" (normal), "3" (180 degrees), "6" (90 degrees CW), "8" (90 degrees CCW).

### Updated Image Entity

Here's how you can update your `Image` entity to include these EXIF data fields:

#### Image.cs
```csharp
public class Image
{
    public int ImageID { get; set; }
    public string UserID { get; set; }
    public string ImageName { get; set; }
    public string ImageDescription { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime LastUpdated { get; set; }
    public string ImageURL { get; set; }

    // EXIF data fields
    public string CameraMake { get; set; }
    public string CameraModel { get; set; }
    public string ExposureTime { get; set; }
    public string FNumber { get; set; }
    public string ISOSpeedRatings { get; set; }
    public DateTime? DateTimeOriginal { get; set; }
    public string LensMake { get; set; }
    public string LensModel { get; set; }
    public string FocalLength { get; set; }
    public double? GPSLatitude { get; set; }
    public double? GPSLongitude { get; set; }
    public double? GPSAltitude { get; set; }
    public int? ImageWidth { get; set; }
    public int? ImageHeight { get; set; }
    public string Orientation { get; set; }

    // Navigation properties
    public ApplicationUser User { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<Like> Likes { get; set; }
    public ICollection<ImageCategory> ImageCategories { get; set; }
    public ICollection<ImageTag> ImageTags { get; set; }
}
```

### Sample DTO with EXIF Data

Update your DTO to include these new EXIF data fields.

#### ImageDetailsDto.cs
```csharp
public class ImageDetailsDto
{
    public int ImageID { get; set; }
    public string ImageName { get; set; }
    public string ImageDescription { get; set; }
    public DateTime UploadDate { get; set; }
    public DateTime LastUpdated { get; set; }
    public string ImageURL { get; set; }

    public string UploaderID { get; set; }
    public string UploaderName { get; set; }

    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }

    public List<CommentDto> Comments { get; set; }
    public List<string> Categories { get; set; }
    public List<string> Tags { get; set; }

    // EXIF data fields
    public string CameraMake { get; set; }
    public string CameraModel { get; set; }
    public string ExposureTime { get; set; }
    public string FNumber { get; set; }
    public string ISOSpeedRatings { get; set; }
    public DateTime? DateTimeOriginal { get; set; }
    public string LensMake { get; set; }
    public string LensModel { get; set; }
    public string FocalLength { get; set; }
    public double? GPSLatitude { get; set; }
    public double? GPSLongitude { get; set; }
    public double? GPSAltitude { get; set; }
    public int? ImageWidth { get; set; }
    public int? ImageHeight { get; set; }
    public string Orientation { get; set; }
}
```

### Updating the Mapper

Update your mapper to include the new EXIF data fields.

#### Mapper.cs
```csharp
public static class Mapper
{
    public static ImageDetailsDto ToDetailsDto(this Image image)
    {
        if (image == null) return null;

        return new ImageDetailsDto
        {
            ImageID = image.ImageID,
            ImageName = image.ImageName,
            ImageDescription = image.ImageDescription,
            UploadDate = image.UploadDate,
            LastUpdated = image.LastUpdated,
            ImageURL = image.ImageURL,
            UploaderID = image.User?.Id,
            UploaderName = image.User?.UserName,
            LikesCount = image.Likes?.Count ?? 0,
            CommentsCount = image.Comments?.Count ?? 0,
            Comments = image.Comments?.Select(c => c.ToDto()).ToList(),
            Categories = image.ImageCategories?.Select(ic => ic.Category.CategoryName).ToList(),
            Tags = image.ImageTags?.Select(it => it.Tag.TagName).ToList(),

            // EXIF data fields
            CameraMake = image.CameraMake,
            CameraModel = image.CameraModel,
            ExposureTime = image.ExposureTime,
            FNumber = image.FNumber,
            ISOSpeedRatings = image.ISOSpeedRatings,
            DateTimeOriginal = image.DateTimeOriginal,
            LensMake = image.LensMake,
            LensModel = image.LensModel,
            FocalLength = image.FocalLength,
            GPSLatitude = image.GPSLatitude,
            GPSLongitude = image.GPSLongitude,
            GPSAltitude = image.GPSAltitude,
            ImageWidth = image.ImageWidth,
            ImageHeight = image.ImageHeight,
            Orientation = image.Orientation
        };
    }

    public static CommentDto ToDto(this Comment comment)
    {
        if (comment == null) return null;

        return new CommentDto
        {
            CommentID = comment.CommentID,
            UserID = comment.UserID,
            UserName = comment.User?.UserName,
            CommentContent = comment.CommentContent,
            CommentDate = comment.CommentDate,
            LastUpdate = comment.LastUpdate,
            IsEdited = comment.IsEdited
        };
    }
}
```

### Updating the Controller

The controller remains mostly the same but ensure it utilizes the updated DTO.

#### ImageController.cs
```csharp
[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly IImageRepository _imageRepository;

    public ImageController(IImageRepository imageRepository)
    {
        _imageRepository = imageRepository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ImageDetailsDto>> GetImageById(int id)
    {
        var image = await _imageRepository.GetImageDetailsByIdAsync(id);

        if (image == null)
        {
            return NotFound();
        }

        var imageDetailsDto = image.ToDetailsDto();
        return Ok(imageDetailsDto);
    }
}
```

### Summary

By including these EXIF data fields in your `Image` entity and DTO, you ensure that all relevant metadata about the image is available and can be sent to the user. This comprehensive approach helps provide a richer user experience and more detailed information about each image.