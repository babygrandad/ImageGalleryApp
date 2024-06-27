using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment> UpdateCommentAsync();
        Task<Comment> DeleteCommentAsync();
        Task<Comment> GetAllComments();
        Task<Comment> GetCommentByID(int id);
    }
}