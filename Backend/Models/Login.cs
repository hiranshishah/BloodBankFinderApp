using MongoDB.Bson.Serialization.Attributes;

namespace BloodBankFinderApp.Models
{
    public class Login
    {
        [BsonElement("User_id")]
        public string username { get; set; }
        [BsonElement("User_password")]
        public string password { get; set; }
    }
}
