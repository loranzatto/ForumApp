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
      using (var context = new ForumContext())
      {        
        context.Topic.Add(topic);
        context.SaveChanges();
        context.Dispose();
      }
    }
    public List<Topic> get()
    {
      using (var context = new ForumContext())
      {
        List<Topic> topicLst = context.Topic.OrderByDescending(t => t.Id).ToList();
        context.Dispose();
        return topicLst;
      }
    }
    public Topic get(int id)
    {
      using (var context = new ForumContext())
      {
        Topic topic = context.Topic.Where(t => t.Id == id).Single();
        context.Dispose();
        return topic;
      }        
    }
    public List<Topic> get(string description)
    {
      using(var context = new ForumContext())
      {
        List<Topic> topic = context.Topic.Where(t => t.Description.Contains(description)).OrderByDescending(t => t.Id).ToList();
        context.Dispose();
        return topic;
      }
    }
  }
}
