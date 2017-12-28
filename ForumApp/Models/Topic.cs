using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
    public class Topic
    {
      public int Id { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      public string UserId { get; set; }
      public virtual User User { get; set; }
      public DateTime CreationDate { get; set; }
      public DateTime? UpdateDate { get; set; }
  }
}
