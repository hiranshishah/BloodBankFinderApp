using System.ComponentModel.DataAnnotations;

namespace BloodBankFinderApp.Models
{
    public class Signup
    {
        [Required(ErrorMessage = "User ID is required.")]
        public string User_id { get; set; }

        [Required(ErrorMessage = "Username is required.")]
        public string User_name { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [DataType(DataType.Password)]
        public string User_password { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid Email Address.")]
        public string User_email { get; set; }

        [Required(ErrorMessage = "Age is required.")]
        [Range(1, 100, ErrorMessage = "Invalid Age.")]
        public int User_age { get; set; }

        [Required(ErrorMessage = "Aadhaar is required.")]
        public string User_adhaar { get; set; }
       

        [Required(ErrorMessage = "Gender is required.")]
        public string User_gender { get; set; }

        [Required(ErrorMessage = "Phone number is required.")]
        [DataType(DataType.PhoneNumber)]
        public string User_phone { get; set; }

        [Required(ErrorMessage = "Address is required.")]
        public string User_address { get; set; }
        [Required(ErrorMessage = "Role is required.")]
        public string User_role { get; set; }
    }
}
