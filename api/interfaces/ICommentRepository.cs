using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment> UpdateCommentAsync(int commentId, UpdateCommentDTO updateCommentDTO, string userId);
        Task<Comment> DeleteCommentAsync(AppUser user, int commentId);
        Task<Comment> GetAllComments();
        Task<Comment> GetCommentByID(int id);
    }
}