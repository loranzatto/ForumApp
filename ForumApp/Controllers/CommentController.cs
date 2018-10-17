using System.Collections.Generic;
using ForumApp.Interfaces;
using ForumApp.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ForumApp.Controllers
{
  [Route("api/[controller]")]
  public class CommentController : Controller
  {
    private ICommentModel _iCommentModel;

    public CommentController()
    {
      _iCommentModel = new CommentModel();
    }
    // POST api/<controller>/5
    [HttpPost("{GetByTopic}")]
    public List<Comment> GetByTopic([FromBody]int topicId)
    {
        return _iCommentModel.get(topicId);
    }

    // POST api/<controller>
    [HttpPost]
    public void Post([FromBody]Comment comment)
    {
      _iCommentModel.insert(comment);
    }
   
  }
}
