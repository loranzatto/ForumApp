using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
  public class Comment
  {
    public int Id { get; set; }
    public string Description { get; set; }
    public int TopicId { get; set; }
    public string UserId { get; set; }
    public virtual Topic topic { get; set; }
   // public virtual User user { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? UpdateDate { get; set; }
  }
}
