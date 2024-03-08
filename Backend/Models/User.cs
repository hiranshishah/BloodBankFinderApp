using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace BloodBankFinderApp.Models
{
    public class User
    {
        
        public ObjectId _id { get; set; }
        public string User_id { get; set; } 
        public string User_name { get; set;}
        public int User_age { get; set;}
        public string User_gender {  get; set;}
        public string User_email { get; set;}
        public string User_phone { get; set;}
        public string User_adhaar { get; set;}
        public string User_address { get; set;}
        public string User_password { get; set;}
        public string User_role { get; set; }

    }
}
