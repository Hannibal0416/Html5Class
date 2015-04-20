<%@ WebHandler Language="C#" Class="formDataHandler" %>

using System;
using System.Web;

public class formDataHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        string name = context.Request.Form["userName"];
        string password = context.Request.Form["password"];
        string type = context.Request.Form["type"];
        string strType = "";
        switch (type)
        {
            case "1" :
                strType = "一般會員";
                break;
            case "2" :
                strType = "企業會員";
                break;
            case "3" :
                strType = "同業會員";
                break;
            default:
                strType = "不知道會員";
                break;
        }
        context.Response.ContentType = "text/plain";
        context.Response.Write("Hello " + name + ", 您的密碼是 " + password + ". 會員類型 : " + strType);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}