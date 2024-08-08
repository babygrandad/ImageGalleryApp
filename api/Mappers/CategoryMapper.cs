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
        // Method to map Category to GetCategoryDTO (includes CategoryID)
        public static GetCategoryDTO ToGetCategoryDTO(this Category categoryModel) 
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

        // Method to map Category to GetCategoriesDTO (only includes CategoryName)
        public static GetCategoriesDTO ToGetCategoriesDTO(this Category categoryModel)
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
    
        public static Category ToCategoryFromCreate(this CreateCategoryDTO createCategoryDTO)
        {
            return new Category
            {
                CategoryName = createCategoryDTO.CategoryName,
            };
        }   
    }
}
