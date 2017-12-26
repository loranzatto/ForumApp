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
    public List<User> get()
    {
      ForumContext context = getContext();
      List<User> userLst = context.User.ToList();
      return userLst;
    }
    public void insert(User user)
    {      
      ForumContext context = getContext();
      context.User.Add(user);
      context.SaveChanges();
    }
    public int count(string id)
    {      
      ForumContext context = getContext();
      int count = context.User.Where(user => user.Id == id).Count();
      return count;
    }

  }
}
