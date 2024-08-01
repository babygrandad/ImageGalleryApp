using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMapper
    {
        public static GetCategoryDTO ToGetCategoriesDTO(this Category categoryModel) 
        {
            if (categoryModel == null)
            {
                return null;
            }

            return new GetCategoryDTO
            {
                CategoryName = categoryModel.CategoryName,
                CategoryID = categoryModel.CategoryID,
            };
        }

        public static GetCategoriesDTO ToGetCategoryDTO(this Category categoryModel)
        {
            if (categoryModel == null)
            {
                return null;
            }

            return new GetCategoriesDTO
            {
                CategoryName = categoryModel.CategoryName,
            };
        }
    
        public static Category ToCategoryFromCreate (this CreateCategoryDTO createCategoryDTO )
        {
            return new Category
            {
                CategoryName = createCategoryDTO.CategoryName,
            };
        }   

    }
}