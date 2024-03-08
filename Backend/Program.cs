

using BloodBankFinderApp.Repositories;
using BloodBankFinderApp.Repositories.Interfaces;
using BloodBankFinderApp.Services;
using BloodBankFinderApp.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;




var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = "https://connectedProgrammer.com",
        ValidAudience = "https://connectedProgrammer.com",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiYmxvb2RiYW5rYWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImhpcmFuc2hpIiwiZXhwIjoxNzA5NTMzNzQ2LCJpYXQiOjE3MDk1MzM3NDZ9.Jxk-282L0jgPq5e0A_jMuQnuQZoX4nXNZargDIk_aJk")),
        //ClockSkew = TimeSpan.Zero
    };
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IBloodBankRepo, BloodBankRepo>();
builder.Services.AddTransient<IBloodBankService,BloodBankService>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddScoped<ISearchRepo, SearchRepo>();
builder.Services.AddTransient<ISearchService, SearchService>();


var mongoUrl = new MongoUrl("mongodb://localhost:27017");
var mongoClient = new MongoClient(mongoUrl);
var database = mongoClient.GetDatabase("BloodBankFinder"); 

builder.Services.AddSingleton<IMongoDatabase>(database);

builder.Services.AddCors((o) =>

{

    o.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowAll");



app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();




app.Run();
