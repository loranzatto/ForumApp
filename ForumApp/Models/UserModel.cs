using ForumApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
  public class UserModel : AppModel , IUserModel
  {
    public UserModel() : base()
    {

    }
    public void toInsert(User user)
    {
      try
      {
        ForumContext context = getContext();
        context.User.Add(user);
        context.SaveChanges();
      }
      catch (Exception e)
      {
        throw e;
      }
    }

  }
}
