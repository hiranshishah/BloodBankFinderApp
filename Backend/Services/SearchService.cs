using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using BloodBankFinderApp.Services.Interfaces;

namespace BloodBankFinderApp.Services
{
    public class SearchService: ISearchService

    {
        private readonly ISearchRepo _searchRepo;
        public SearchService(ISearchRepo searchRepo)
        {
            _searchRepo = searchRepo;
            
        }
        public async Task<List<BloodBank>> GetFilteredBloodBanks(string searchterm)
        {
            return await _searchRepo.GetFilteredBloodBanks(searchterm);
        }
    }
}
