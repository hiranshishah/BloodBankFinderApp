using BloodBankFinderApp.Models;
using BloodBankFinderApp.Repositories.Interfaces;
using BloodBankFinderApp.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BloodBankFinderApp.Controllers
{
    //[Authorize(Roles = "bloodbankadmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class BloodBankController : ControllerBase
    {
        private readonly IBloodBankService _service;

        public BloodBankController(IBloodBankService repository)
        {
            _service = repository;
        }

        [HttpGet]
        public  ActionResult<BloodBank> GetBloodBanks()
        {
            var bloodBanks = _service.GetBloodBanks();
            return Ok(bloodBanks);
        }

        [HttpGet("{id}")]
        public ActionResult<BloodBank> GetBloodBankById(string id)
        {
            var bloodBank = _service.GetBloodBankById(id);

            return Ok(bloodBank);
        }

        [HttpPost]
        public ActionResult<BloodBank> CreateBloodBank([FromBody]BloodBank bloodBank)
        {
            var cb = _service.CreateBloodBank(bloodBank);

            return CreatedAtAction(nameof(GetBloodBankById), new { id = cb.srNo.ToString() }, bloodBank);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBloodBank(string id, BloodBank bloodBankIn)
        {
            var bloodBank = _service.UpdateBloodBank(id, bloodBankIn);


            return Ok(bloodBank);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBloodBank(string id)
        {
            var bloodBank =  _service.GetBloodBankById(id);

            if (bloodBank == null)
            {
                return NotFound();
            }

             _service.DeleteBloodBank(id);

            return NoContent();
        }
    }
}