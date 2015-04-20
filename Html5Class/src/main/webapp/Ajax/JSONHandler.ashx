<%@ WebHandler Language="C#" Class="JSONHandler" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Web.Script.Serialization;

public class JSONHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
       // System.Threading.Thread.Sleep(5000);
        Employee emp1 = new Employee { Name = "Jack", ID = "1", Age = "29" };
        Employee emp2 = new Employee { Name = "Mary", ID = "2", Age = "21" };
        Employee emp3 = new Employee { Name = "Tom", ID = "3", Age = "35" };

        List<Employee> empList = new List<Employee>() { emp1, emp2, emp3 };



        JavaScriptSerializer sel = new JavaScriptSerializer();

        //將List轉成JSON
        string strJSON = sel.Serialize(empList);
          
        
        context.Response.ContentType = "application/json";
        //如果要允許可以使用Ajax從別的Domian來呼叫,要將下面的程式註解開啟
       // context.Response.AppendHeader("Access-Control-Allow-Origin", "*");
        context.Response.Write(strJSON);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}

public class Employee
{
    public string Name { get; set; }
    public string Age { get; set; }
    public string ID { get; set; }

}