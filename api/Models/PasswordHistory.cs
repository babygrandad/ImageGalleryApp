using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
     [Table("PasswordHistories")]
    public class PasswordHistory
    {
        [Key]
        public int PasswordID { get; set; }
        public string UserID { get; set; }
        public string HashedPassword { get; set; }
        public DateTime ChangedDate { get; set; } = DateTime.Now;

        public virtual AppUser AppUser { get; set; }
    }
}
