<%@ WebHandler Language="C#" Class="LoadRSS" %>

using System;
using System.Web;
using System.Xml.Linq;
using Newtonsoft.Json;
using System.Xml;
using System.Collections.Generic;

public class LoadRSS : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
      


        XDocument doc = XDocument.Load("https://tw.news.yahoo.com/rss/");
      
        List<Item> Items = new List<Item>();
        foreach (XElement itemElement in doc.Descendants("item"))
        {
           // context.Response.Write(itemElement.Element("title").Value);
            Item _item = new Item();
            _item.title = itemElement.Element("title").Value;
            _item.link = itemElement.Element("link").Value;
            _item.pubDate = itemElement.Element("pubDate").Value;
            Items.Add(_item);
           
        }
       
       
        context.Response.AppendHeader("Content-type", "text/event-stream");
        context.Response.Write("data:" + JsonConvert.SerializeObject(Items) + "\n\n" + "retry:10000" + "\n\n");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class Item{
    public string title { get; set; }
    public string link { get; set; }
    public string pubDate { get; set; }
}