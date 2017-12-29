using ForumApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Interfaces
{
    public interface ICommentModel
    {
      void insert(Comment comment);
      List<Comment> get(int topicId);
    }
}
