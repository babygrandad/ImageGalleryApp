using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.interfaces;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace api.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _dbContext;

         public CommentRepository(ApplicationDBContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;

        }

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _dbContext.AddAsync(commentModel);
            await _dbContext.SaveChangesAsync();
            return commentModel;
        }

        public Task<Comment> DeleteCommentAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Comment> GetAllComments()
        {
            throw new NotImplementedException();
        }

        public async Task<Comment?> GetCommentByID(int id)
        {
           return await _dbContext.Comments.FindAsync(id);
        }

        public async Task<Comment> UpdateCommentAsync(int commentId, UpdateCommentDTO updateCommentDTO, string userId)
        {
            var comment = await _dbContext.Comments.FindAsync(commentId);

            if (comment == null)
            {
                return null;
            }

            if (comment.UserID != userId)
            {
                throw new UnauthorizedAccessException("User is not authorized to update this comment.");
            }

            comment.CommentContent = updateCommentDTO.CommentContent;
            comment.LastUpdate = updateCommentDTO.LastUpdate;
            comment.IsEdited = true;

            await _dbContext.SaveChangesAsync();
            return comment;
        }
    }
}