using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Repositories.Interfaces
{
    public interface ISearchRepo
    {
        Task<List<BloodBank>> GetFilteredBloodBanks( string searchterm);
        
    }
}
