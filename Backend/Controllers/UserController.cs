﻿
using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories;
using BloodBankFinderApp.Services.Interfaces;
using DnsClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BloodBankFinderApp.Controllers
{
    //[Authorize(Roles = "user")]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
       

        public UserController(IUserService userService)
        {
            _userService = userService;
           
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            var createdUser = await _userService.CreateUser(user);
            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.User_id }, createdUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, User user)
        {
            var updated = await _userService.UpdateUser(id, user);
            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var deleted = await _userService.DeleteUser(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(Signup model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            User newUser = new User
            {
                User_id = model.User_id,
                User_name = model.User_name,
                User_password = model.User_password,
                User_email = model.User_email,
                User_age = model.User_age,
                User_gender = model.User_gender,
                User_phone = model.User_phone,
                User_adhaar = model.User_adhaar,
                User_address = model.User_address,
                User_role = model.User_role,
            };

            User createdUser = await _userService.CreateUser(newUser);

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.User_id }, createdUser);
        }
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiYmxvb2RiYW5rYWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImhpcmFuc2hpIiwiZXhwIjoxNzA5NTMzNzQ2LCJpYXQiOjE3MDk1MzM3NDZ9.Jxk-282L0jgPq5e0A_jMuQnuQZoX4nXNZargDIk_aJk"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.User_id),
        new Claim(ClaimTypes.Role, user.User_role) 
    };

            var token = new JwtSecurityToken(
                "https://connectedProgrammer.com",
                "https://connectedProgrammer.com",
                claims, 
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [AllowAnonymous]

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login request)
        {
            var user = await _userService.Login(request);
            if (user == null)
            {
                return BadRequest("Incorrect username or password");
            }
            var token = GenerateToken(user);
            return Ok(new { token, user.User_role });
            //return Ok(new { message = "Logged in successfully", username = user.User_id });
        }

    }
}