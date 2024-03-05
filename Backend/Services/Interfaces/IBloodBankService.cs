using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Services.Interfaces
{
    public interface IBloodBankService
    {

        List<BloodBank> GetBloodBanks();
        BloodBank GetBloodBankById(string id);
        BloodBank CreateBloodBank(BloodBank bloodBank);
        bool UpdateBloodBank(string id, BloodBank bloodBankIn);
        bool DeleteBloodBank(string id);
    
}
}
