<%@ WebHandler Language="C#" Class="UploadHandler" %>

using System;
using System.Web;

public class UploadHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        HttpPostedFile file = context.Request.Files["myFile"];
        //實際路徑
        string strFile = context.Server.MapPath("upload") + "\\" + file.FileName ;
            
        file.SaveAs(strFile);
        context.Response.ContentType = "text/plain";
        context.Response.Write("檔案上傳完成!!");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}