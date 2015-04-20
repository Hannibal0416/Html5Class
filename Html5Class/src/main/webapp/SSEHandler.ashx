<%@ WebHandler Language="C#" Class="SSEHandler" %>

using System;
using System.Web;

public class SSEHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/event-stream";
        context.Response.Write(string.Format("event:{0}\n", "show"));
        context.Response.Write(string.Format("data:{0}\n\n", DateTime.Now.ToString()));
        context.Response.Write(string.Format("retry:{0}\n", "5000"));
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}