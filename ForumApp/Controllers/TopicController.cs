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
  [Route("api/[controller]/[action]")]
  public class TopicController : Controller
  {

    private ITopicModel _iTopicModel;

    public TopicController()
    {
      _iTopicModel = new TopicModel();
    }
    // GET api/<controller>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "value";
    }
    [HttpPost]
    [ActionName("GetByDescription")]
    public List<Topic> GetByDescription([FromBody]string description)
    {
      return _iTopicModel.get(description);
    }
    [HttpPost]
    [ActionName("GetAll")]
    public List<Topic> GetAll()
    {
      return _iTopicModel.get();
    }
    [HttpPost]
    [ActionName("GetById")]
    public Topic GetById([FromBody]int id)
    {
      return _iTopicModel.get(id);
    }
    
    // POST api/<controller>
    [HttpPost]
    [ActionName("Insert")]
    public void Post([FromBody]Topic topic)
    {
      _iTopicModel.insert(topic);
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
