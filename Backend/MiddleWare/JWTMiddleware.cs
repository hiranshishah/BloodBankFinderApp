using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace BloodBankFinderApp.MiddleWare
{
    public class JWTMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;

        public JWTMiddleware(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiYmxvb2RiYW5rYWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImhpcmFuc2hpIiwiZXhwIjoxNzA5NTMzNzQ2LCJpYXQiOjE3MDk1MzM3NDZ9.Jxk-282L0jgPq5e0A_jMuQnuQZoX4nXNZargDIk_aJk"])),
                    ValidateIssuer = true,
                    ValidIssuer = _config["https://connectedProgrammer.com"],
                    ValidateAudience = true,
                    ValidAudience = _config["https://connectedProgrammer.com"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                try
                {
                    var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                    context.User = principal;
                }
                catch
                {
                    context.Response.StatusCode = 401;
                    return;
                }
            }

            await _next(context);
        }
    }
}
