using ForumApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Interfaces
{
    interface ITopicModel
    {
      void insert(Topic topic);
    }
}
