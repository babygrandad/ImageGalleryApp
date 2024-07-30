using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
        : base(dbContextOptions)
        {
        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ImageTag> ImageTags { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Rename the Id column in the AppUser table to UserID
            modelBuilder.Entity<AppUser>()
                .Property(u => u.Id)
                .HasColumnName("UserID");

            // Image relationships
            modelBuilder.Entity<Image>()
                .HasOne(i => i.AppUser)
                .WithMany(u => u.Images)
                .HasForeignKey(i => i.UserID);

            modelBuilder.Entity<Image>()
                .HasOne(i => i.Category)
                .WithMany(c => c.Images)
                .HasForeignKey(i => i.CategoryID);

            modelBuilder.Entity<ImageTag>()
                .HasOne(it => it.Image)
                .WithMany(i => i.ImageTags)
                .HasForeignKey(it => it.ImageID);

            modelBuilder.Entity<ImageTag>()
                .HasOne(it => it.Tag)
                .WithMany(t => t.ImageTags)
                .HasForeignKey(it => it.TagID);

            modelBuilder.Entity<Like>()
                .HasOne(l => l.Image)
                .WithMany(i => i.Likes)
                .HasForeignKey(l => l.ImageID)
                .OnDelete(DeleteBehavior.Cascade); // Cascade delete for Likes associated with Image

            modelBuilder.Entity<Like>()
                .HasOne(l => l.AppUser)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserID)
                .OnDelete(DeleteBehavior.NoAction); // Note to self - implement this manually - delete all likes with this userID

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Image)
                .WithMany(i => i.Comments)
                .HasForeignKey(c => c.ImageID)
                .OnDelete(DeleteBehavior.Cascade); // Configure cascade delete for Image relationship

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.AppUser)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserID)
                .OnDelete(DeleteBehavior.NoAction); // Note to self - implement this manually - delete all comments with this user ID

            // Unique constraints
            modelBuilder.Entity<Category>()
                .HasIndex(c => c.CategoryName)
                .IsUnique();

            modelBuilder.Entity<Tag>()
                .HasIndex(t => t.TagName)
                .IsUnique();

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name="Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole
                {
                    Name="User",
                    NormalizedName="USER",
                }
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

        }
    }
}
