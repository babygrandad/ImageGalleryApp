using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.interfaces;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;


namespace api.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _dbContext;
        public CommentRepository(ApplicationDBContext dbContext)
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

        public Task<Comment> UpdateCommentAsync()
        {
            throw new NotImplementedException();
        }
    }
}