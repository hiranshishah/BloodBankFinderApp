using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories;
using BloodBankFinderApp.Repositories.Interfaces;
using BloodBankFinderApp.Services.Interfaces;

namespace BloodBankFinderApp.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepo _userRepository;

        public UserService(IUserRepo userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userRepository.GetAllUsers();
        }

        public async Task<User> GetUserById(string id)
        {
            return await _userRepository.GetUserById(id);
        }

        public async Task<User> CreateUser(User user)
        {
            return await _userRepository.CreateUser(user);
        }

        public async Task<bool> UpdateUser(string id, User updatedUser)
        {
            return await _userRepository.UpdateUser(id, updatedUser);
        }

        public async Task<bool> DeleteUser(string id)
        {
            return await _userRepository.DeleteUser(id);
        }
        //public async Task<User> login(Login request)
        //{
        //    return await _userRepository.login(request.Username, request.Password);
        //}
        //public async Task<User> login(Login request)
        //{
        //    return await _userRepository.login(request.Username,request.Password);
        //}

        public async Task<User> Login(Login request)
        {
            return await _userRepository.login(request.username, request.password);
        }

        //User IUserService.login(Login request)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
