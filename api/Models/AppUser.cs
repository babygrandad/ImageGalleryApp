using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class AppUser : IdentityUser
{
    public string FullName { get; set; } 
    public DateTime CreatedDate { get; set; } = DateTime.Now;

    public List<Image> Images { get; set; } = new List<Image>();
    public List<Like> Likes { get; set; } = new List<Like>();
    public List<Comment> Comments { get; set; } = new List<Comment>();


    // Override Id property to rename it to UserID
    //public override string Id { get; set; }
    //public string UserID
    //{
    //    get => Id;
    //    set => Id = value;
    //}

}
}