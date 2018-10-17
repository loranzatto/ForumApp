using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ForumApp.Interfaces;
using ForumApp.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ForumApp.Controllers
{
  [Route("api/[controller]")]
  public class UserController : Controller
  {
    private IUserModel _iUserModel;

    public UserController()
    {
      _iUserModel = new UserModel();            
    }
    
    // GET api/<controller>/5
    [HttpGet("{id}")]
    public int Count(string id)
    {
      return _iUserModel.count(id);
    }

    [HttpPost("{get}")]
    public User Get([FromBody]User user)
    {
      return _iUserModel.get(user.Id, user.Password);
    }

    // POST api/<controller>
    [HttpPost]
    public void Post([FromBody]User user)
    {
      _iUserModel.insert(user);
    }

    // PUT api/<controller>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/<controller>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
