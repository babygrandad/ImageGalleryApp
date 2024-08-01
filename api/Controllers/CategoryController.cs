using api.Data;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ApplicationDBContext dbContext, ICategoryRepository categoryRepo)
        {
            _dbContext = dbContext;
            _categoryRepo = categoryRepo;
        }


        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryRepo.GetAllCategoriesAsync();
            var categoriesDTO = categories.Select(c => c.ToGetCategoriesDTO());
            return Ok(categoriesDTO);
        }

    }
}