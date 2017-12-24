using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
    public class AppModel
    {    
      private static ForumContext context;
      public AppModel()
      {

      }
      protected static ForumContext getContext()
      {
        if (context == null)
        {
          context = new ForumContext();
          return context;
        }
        return context;
      }
      
    }
}
