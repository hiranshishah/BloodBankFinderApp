using BloodBankFinderApp.Models;

namespace BloodBankFinderApp.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(string id);
        Task<User> CreateUser(User user);
        Task<bool> UpdateUser(string id, User updatedUser);
        Task<bool> DeleteUser(string id);
        //User login(Login username, Login password);
        Task<User> Login(Login request);
    }
}
