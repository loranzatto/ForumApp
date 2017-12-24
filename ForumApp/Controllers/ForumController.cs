using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ForumApp.Interfaces;
using ForumApp.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ForumApp.Controllers
{
    [Route("api/[controller]")]
    public class ForumController : Controller
    {
        private IUserModel _iUserModel;

        public ForumController()
        {
          _iUserModel = new UserModel();
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2", "value3", "value4" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost]
        public object Post([FromBody] JObject jObject)
        {
          dynamic json = jObject;
          User user = new User();
          user.Id = json.Id;
          user.Name = json.Name;
          user.Email = json.Email;
          user.Password = json.Password;
          user.CreationDate = DateTime.Now;

          _iUserModel.toInsert(user); 
          return "Suceeded";
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            id.ToString();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
