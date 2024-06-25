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
                ImageID = commentModel.ImageID,
                UserID = commentModel.UserID,
                CommentContent = commentModel.CommentContent,
                CommentDate = commentModel.CommentDate,
                LastUpdate = commentModel.LastUpdate,
                IsEdited = commentModel.IsEdited,
                UserName = commentModel.AppUser.UserName
            };
        }
    }
}