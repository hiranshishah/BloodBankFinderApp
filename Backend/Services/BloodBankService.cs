using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using BloodBankFinderApp.Services.Interfaces;

namespace BloodBankFinderApp.Services
{
    public class BloodBankService: IBloodBankService
    {
        IBloodBankRepo _bloodBankRepo;

        public BloodBankService(IBloodBankRepo bloodBankRepo)
        {
            _bloodBankRepo= bloodBankRepo;
        }


        public BloodBank CreateBloodBank(BloodBank bloodBank)
        {
            return  _bloodBankRepo.CreateBloodBank(bloodBank);
        }

        public bool DeleteBloodBank(string id)
        {
            return  _bloodBankRepo.DeleteBloodBank(id);
        }

        public BloodBank GetBloodBankById(string id)
        {
            return  _bloodBankRepo.GetBloodBankById(id);
        }

        public  List<BloodBank> GetBloodBanks()
        {
            return _bloodBankRepo.GetBloodBanks();
        }

        public bool UpdateBloodBank(string id, BloodBank bloodBankIn)
        {
            return  _bloodBankRepo.UpdateBloodBank(id, bloodBankIn);
        }
    }
}
