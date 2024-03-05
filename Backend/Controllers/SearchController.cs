using BloodBankFinderApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BloodBankFinderApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }
        [HttpGet]
        [Route("{searchTerm}")]
        public async Task<IActionResult> GetFilteredBloodBanks(string searchTerm)
        {
            Console.WriteLine("Controller" + searchTerm);
            var schedules = await _searchService.GetFilteredBloodBanks(searchTerm);
            return Ok(schedules);
        }
    }
}
