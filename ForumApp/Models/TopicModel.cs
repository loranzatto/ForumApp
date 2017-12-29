using ForumApp.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ForumApp.Models
{
    public class TopicModel : AppModel, ITopicModel
  {
    public void insert(Topic topic)
    {
        ForumContext context = getContext();
        context.Topic.Add(topic);
        context.SaveChanges();
    }
    public List<Topic> get()
    {
      ForumContext context = getContext();
      List<Topic> topicLst = context.Topic.ToList();
      return topicLst;
    }
  }
}
