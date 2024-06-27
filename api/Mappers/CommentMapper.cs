using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static GetCommentDTO ToGetCommentDTO(this Comment commentModel)
        {
            if (commentModel == null)
                return null;

            return new GetCommentDTO
            {
                CommentID = commentModel.CommentID,
                CommentContent = commentModel.CommentContent,
                CommentDate = commentModel.CommentDate,
                LastUpdate = commentModel.LastUpdate,
                IsEdited = commentModel.IsEdited,
                FullName = commentModel.AppUser.FullName,
            };
        }

        public static Comment ToCommentFromCreate (this CreateCommentDTO createCommentDTO, int imageId)
        {
            return new Comment
            {
                CommentContent = createCommentDTO.CommentContent,
                CommentDate = createCommentDTO.CommentDate,
                LastUpdate = createCommentDTO.LastUpdate,

            };
        }
    }
}
