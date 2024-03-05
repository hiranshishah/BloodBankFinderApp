using System.Collections.Generic;
using System.Threading.Tasks;
using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Repositories.Interfaces
{
    public interface IBloodBankRepo
    {

       List<BloodBank> GetBloodBanks();
        BloodBank GetBloodBankById(string id);
        BloodBank CreateBloodBank(BloodBank bloodBank);
        bool UpdateBloodBank(string id, BloodBank bloodBankIn);
        bool DeleteBloodBank(string id);
    }

}
