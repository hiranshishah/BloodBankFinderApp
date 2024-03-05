
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BloodBankFinderApp.Models
{
    [BsonIgnoreExtraElements]

    public class BloodBank
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("serial_id")]
        public string srNo { get; set; }

        [BsonElement("bloodbankname")]
        public string bloodbankname { get; set; }
        [BsonElement("state")]
        public string state { get; set; }
        [BsonElement("city")]
        public string city { get; set; }
        [BsonElement("address")]
        public string address { get; set; }
        [BsonElement("pincode")]

        public int pincode { get; set; }

        [BsonElement("contact")]
        public Int64 contact { get; set; }
        [BsonElement("email")]

        public string email { get; set; }

        [BsonElement("nodalofficer ")]
        public string nodalofficer { get; set; }

        [BsonElement("operationalhours")]
        public string operationalhours { get; set; }

        [BsonElement("latitude")]

        public double latitude { get; set; }

        [BsonElement("longitude")]
        public double longitude { get; set; }

        [BsonElement("bloodtypes")]
        public bloodtypess bloodtypes { get; set; }
        [BsonElement("price")]
        public double price { get; set; }
    }
    public class bloodtypess
    {
        public int A_p { get; set; }
        public int B_p { get; set; }
        public int AB_p { get; set; }
        public int O_p { get; set; }
        public int A_m { get; set; }
        public int B_m { get; set; }
        public int AB_m { get; set; }
        public int O_m { get; set; }

    }
    

    
}
    