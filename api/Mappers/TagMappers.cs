using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Tag;
using api.Models;

namespace api.Mappers
{
    public static class TagMappers
    {
        public static GetTagDTO ToGetTagDTO(this Tag tagModel)
        {
            if (tagModel == null)
            {
                return null;
            }

            return new GetTagDTO
            {
                TagName = tagModel.TagName,
            };
        }
    }
}