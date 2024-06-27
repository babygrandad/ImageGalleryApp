using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMappers
    {
        public static GetCategoryDTO ToGetCategoryDTO(this Category categoryModel)
        {
            if (categoryModel == null)
            {
                return null;
            }

            return new GetCategoryDTO
            {
                CategoryName = categoryModel.CategoryName,
            };
        }
    }
}