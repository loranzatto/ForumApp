using ForumApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Interfaces
{
  interface IUserModel : IAppModel
  {
    void insert(User user);
    int count(string id);
    List<User> get();

  }
}
