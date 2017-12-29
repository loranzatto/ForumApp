using ForumApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
    public class CommentModel : AppModel, ICommentModel
  {
      public void insert(Comment comment)
      {
        ForumContext context = getContext();
        context.Comment.Add(comment);
        context.SaveChanges();
      }
      public List<Comment> get(int topicId)
      {
        ForumContext context = getContext();
        List<Comment> commentLst = context.Comment.Where(c => c.TopicId == topicId).ToList();
        return commentLst;
      }
  }
}
