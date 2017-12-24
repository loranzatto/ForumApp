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
      return context.User.ToList();
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
      return context.User.Where(user => user.Id == id).Count();
    }

  }
}
