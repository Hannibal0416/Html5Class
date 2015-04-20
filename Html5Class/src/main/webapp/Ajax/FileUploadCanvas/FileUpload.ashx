<%@ WebHandler Language="C#" Class="FileUpload" %>

using System;
using System.Web;
using System.IO;

public class FileUpload : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        String strID = context.Request.Form["id"];
        String fileName = context.Server.MapPath(strID + ".png");
        using (FileStream fs = new FileStream(fileName, FileMode.Create))
        {
            using (BinaryWriter bw = new BinaryWriter(fs))
            {
                String strImg = context.Request.Form["imageData"];
                strImg = strImg.Replace(" ", "+");
                byte[] data = Convert.FromBase64String(strImg);
                bw.Write(data);
                bw.Close();
            }
        }

        context.Response.ContentType = "text/plain";
        context.Response.Write("上傳完成!!");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}