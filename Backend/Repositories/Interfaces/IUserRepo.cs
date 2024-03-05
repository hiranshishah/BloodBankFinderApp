using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Repositories.Interfaces
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(string id);
        Task<User> CreateUser(User user);
        Task<bool> UpdateUser(string id, User updatedUser);
        Task<bool> DeleteUser(string id);
        Task<User> login(string username, string password);
    }
}
