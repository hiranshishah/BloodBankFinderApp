using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BloodBankFinderApp.Repositories
{
    public class SearchRepo : ISearchRepo
    {
        private readonly IMongoCollection<BloodBank> _searchbanks;
        public SearchRepo()
        {

            var client = new MongoClient("mongodb://localhost:27017");
            var d = client.GetDatabase("BloodBankFinder");

            _searchbanks = d.GetCollection<BloodBank>("BloodBankDetails");
        }

        public async Task<List<BloodBank>> GetFilteredBloodBanks(string searchterm)
        {
            int pincode;
            bool isNumeric = int.TryParse(searchterm, out pincode);
           
            searchterm = searchterm.ToLower();

            var filter = Builders<BloodBank>.Filter.Or(
                Builders<BloodBank>.Filter.Regex(ts => ts.city, new BsonRegularExpression(searchterm, "i")),
                Builders<BloodBank>.Filter.Regex(ts => ts.state, new BsonRegularExpression(searchterm, "i")),
                Builders<BloodBank>.Filter.Regex(ts => ts.bloodbankname, new BsonRegularExpression(searchterm, "i"))
            );
            if (isNumeric)
            {
                filter = filter | Builders<BloodBank>.Filter.Eq(ts => ts.pincode, pincode);
            }
            Console.WriteLine(filter);

            var schedules = await _searchbanks.Find(filter).ToListAsync();
            Console.WriteLine(schedules.Count.ToString());
            return schedules;
        }
    }
}
