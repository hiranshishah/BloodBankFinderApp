using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace BloodBankFinderApp.Repositories
{
    public class BloodBankRepo : IBloodBankRepo
    {
        private readonly IMongoCollection<BloodBank> _bloodBanks;

        public BloodBankRepo()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("BloodBankFinder");

            _bloodBanks = database.GetCollection<BloodBank>("BloodBankDetails");
        }
        public  List<BloodBank> GetBloodBanks()
        {
            
           return _bloodBanks.Find(bloodBank => true).ToList();
        }


        public BloodBank GetBloodBankById(string id)
        {

            return _bloodBanks.Find<BloodBank>(bloodBank => bloodBank.srNo == id).FirstOrDefault();
        }
        public BloodBank CreateBloodBank(BloodBank bloodBank)
        {
             _bloodBanks.InsertOne(bloodBank);
            return bloodBank;
        }

       
        public bool UpdateBloodBank(string id, BloodBank bloodBankIn)
        {
            var filter = Builders<BloodBank>.Filter.Eq("serial_id", id);
            var update = Builders<BloodBank>.Update
                .Set("serial_id", bloodBankIn.srNo)
                .Set("bloodbankname", bloodBankIn.bloodbankname)
                .Set("state", bloodBankIn.state)
                .Set("city", bloodBankIn.city)
                .Set("address", bloodBankIn.address)
                .Set("pincode", bloodBankIn.pincode)
                .Set("contact", bloodBankIn.contact)
                .Set("email", bloodBankIn.email)
                .Set("nodalofficer ", bloodBankIn.nodalofficer)
                .Set("operationalhours", bloodBankIn.operationalhours)
                .Set("latitude", bloodBankIn.latitude)
                .Set("longitude", bloodBankIn.longitude)
                .Set("bloodtypes", bloodBankIn.bloodtypes);

            var result =  _bloodBanks.UpdateOne(filter, update);

            return result.ModifiedCount > 0;
        }
        public bool DeleteBloodBank(string id)
        {
            var res =  _bloodBanks.DeleteOne(bloodBank => bloodBank.srNo.ToString() == id);
            return res.DeletedCount > 0;
        }
    }
}
