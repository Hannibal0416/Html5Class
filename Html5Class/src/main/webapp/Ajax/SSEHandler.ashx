<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.AppendHeader("Content-type", "text/event-stream");
       // context.Response.AppendHeader("Cache-Control", "no-cache");
        context.Response.Write("data:" + DateTime.Now.ToString() + "\n\n" + "retry:1000" + "\n\n");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}