using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Services.Interfaces
{
    public interface ISearchService
    {
        Task<List<BloodBank>> GetFilteredBloodBanks(string searchterm);
    }
}
