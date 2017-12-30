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
    private ITopicModel _iTopicModel;
    private ICommentModel _iCommentModel;

    public ForumController()
    {
      _iUserModel = new UserModel();
      _iTopicModel = new TopicModel();
      _iCommentModel = new CommentModel();

    }
    // GET: api/<controller>

    //[Route(template: "api/{controller}/{id}")]
    [HttpGet("{Id}")]
    public int Get(string id)
    {     
      return _iUserModel.count(id);
    }    
    /*
    // GET api/<controller>/5
    [HttpGet("{Id}")]
    public int Get()
    {
      //int count = _iUserModel.count();
      return 0;
    }
    */

    // POST api/<controller>
    [HttpPost]
    public object Post([FromBody] JObject jObject)
    {
      
      object returnedObject = null;

      dynamic json = jObject;
      string processType = json.ProcessType;
      string classType = json.ClassType;

      switch (classType)
      {
        case "User":
          {
            User user = new User();
            returnedObject = new User();

            user.Id = json.Id;
            user.Name = json.Name;
            user.Email = json.Email;
            user.Password = json.Password;
            user.CreationDate = DateTime.Now;

            if (processType != "get")
            {
              _iUserModel.insert(user);
            }
            else
            {
              returnedObject = _iUserModel.get(user.Id, user.Password);
            }
            break;
          }
        case "Topic":
          {
            Topic topic = new Topic();
            returnedObject = new Topic();
            
            topic.Title = json.Title;
            topic.Description = json.Description;
            topic.UserId = json.UserId;
            topic.CreationDate = DateTime.Now;

            if (processType != "get")
            {
              _iTopicModel.insert(topic);
            }else
            {
              if(json.Id != null && json.Id > 0)
              {
                topic.Id = json.Id;
                returnedObject = _iTopicModel.get(topic.Id);
              }
              else if(topic.Description.Length > 0)
              {
                returnedObject = _iTopicModel.get(topic.Description);
              }
              else
              {
                returnedObject = _iTopicModel.get();
              }
            }

            break;
          }
        case "Comment":
          {
            Comment comment = new Comment();
            returnedObject = new Comment();

            comment.Description = json.Description;
            comment.TopicId = json.TopicId;
            comment.UserId = json.UserId;
            comment.CreationDate = DateTime.Now;

            if (processType != "get")
            {
              _iCommentModel.insert(comment);
            }
            else
            {
              returnedObject = _iCommentModel.get(comment.TopicId);
            }

            break;
          }
      }
      return returnedObject != null ? returnedObject : null;
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
