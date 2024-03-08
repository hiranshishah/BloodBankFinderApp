using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;

namespace BloodBankFinderApp.Repositories
{
    public class UserRepo: IUserRepo
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserRepo(IMongoDatabase database)
        {

            var client = new MongoClient("mongodb://localhost:27017");
            var db = client.GetDatabase("BloodBankFinder");
            _userCollection = db.GetCollection<User>("UserDetails");
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userCollection.Find(user => true).ToListAsync();
        }

        public async Task<User> GetUserById(string id)
        {
            return await _userCollection.Find(user => user.User_id == id).FirstOrDefaultAsync();
        }
        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return BitConverter.ToString(hash).Replace("-", "").ToLower();
        }
        public async Task<User> CreateUser(User user)

        {
            user.User_password = HashPassword(user.User_password);
            await _userCollection.InsertOneAsync(user);
            return user;
        }

        public async Task<bool> UpdateUser(string id, User updatedUser)
        {
            var filter = Builders<User>.Filter.Eq(user => user.User_id, id);
            var update = Builders<User>.Update.Set(user => user.User_name, updatedUser.User_name)
                                              .Set(user => user.User_age, updatedUser.User_age)
                                              .Set(user => user.User_gender, updatedUser.User_gender)
                                              .Set(user => user.User_email, updatedUser.User_email)
                                              .Set(user => user.User_phone, updatedUser.User_phone)
                                              .Set(user => user.User_adhaar, updatedUser.User_adhaar)
                                              .Set(user => user.User_address, updatedUser.User_address)
                                              .Set(user => user.User_password, HashPassword(updatedUser.User_password));

            var result = await _userCollection.UpdateOneAsync(filter, update);
            return result.ModifiedCount > 0;
        }

        public async Task<bool> DeleteUser(string id)
        {
            var result = await _userCollection.DeleteOneAsync(user => user.User_id == id);
            return result.DeletedCount > 0;
        }
       
        public async Task<User> login(string username, string password)
        {
            var hashedPassword = HashPassword(password);
            var user = await _userCollection.Find(u => u.User_id == username && u.User_password == hashedPassword).FirstOrDefaultAsync();

            if (user != null)
            {
                Console.WriteLine("Logged in successfully");
                return user;
            }
            Console.WriteLine("Error logging in, user does not exist or incorrect password");
            
            return null;
        }

    }
    
}
