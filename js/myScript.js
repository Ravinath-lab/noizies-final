const host = "http://104.198.28.198:8080/";
var token = window.localStorage.getItem("token");
if(token === null || token === ""){
     window.location = "login.html";
}else{
    console.log(token);
$(document).ready(function(){
    readCategory();
    readUsers();
    readProducts();
    
    ///===user=======================
    $("#saveUser").click(function(){
        var name = $("#username");
        var mobile = $("#mobile");
        var email = $("#email");
        var password = $("#pwd");
        var age = $("#age");
        var user = {
            "name":name.val(),
            "password":password.val(),
            "email":email.val(),
            "mobile":mobile.val(),
            "age":age.val()
        };
        var settings = {
            "url": host+"user/save",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "AUTH="+token
            },
            "data": JSON.stringify(user),
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
            name.val("");
            email.val("");
            mobile.val("");
            age.val("");
            password.val("");
            alert("Success");
            readUsers();
          });
    });
    
    $("#updateUser").click(function(){
        var name = $("#updateUsername");
        var mobile = $("#updateMobile");
        var email = $("#updateEmail");
        var password = $("#updatePwd");
        var age = $("#updateAge");
        var id = $("#uid");
        var user = {
            "userId":id.val(),
            "name":name.val(),
            "password":password.val(),
            "email":email.val(),
            "mobile":mobile.val(),
            "age":age.val()
        };
        var settings = {
            "url": host+"user/update",
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "AUTH="+token
            },
            "data": JSON.stringify(user)
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
            name.val("");
            email.val("");
            mobile.val("");
            age.val("");
            password.val("");
            alert("Success");
            readUsers();
          });
    });
  
  
  
    
    
    
});


function readUsers(){
    var settings = {
        "url": host+"user/getAll",
        "method": "GET",
        "timeout": 0,
        
        "headers": {
            "Content-Type": "application/json",
             "Authorization": "AUTH="+token.trim()
             }
      };

    $.ajax(settings).done(function (response) {
       loadUsers(response);
    });
}

function loadUsers(data){
    console.log(data);
    var tbody = $("#userTbody");
    var line = "";
    data.forEach(user =>{
        var row = "<tr><td>";
        row += user.id+"</td>";
        row += "<td>"+ user.name+"</td>";
        row += "<td>"+ user.email+"</td>";
        row += "<td>"+ user.mobile+"</td>";
        row += "<td>"+ user.age+"</td>";
        row += "<td>";
        row += "<button  type=\"button\" class=\"btn btn-warning btn-sm m-1 user-u\"  data-id=\""+user.id+"\">Update</button>";
        row += "<button  type=\"button\" class=\"btn btn-danger btn-sm m-1 user-d\"  data-id=\""+user.id+"\">Delete</button>";
        row += "</td></tr>";
        line += row;
    });
    tbody.html(line);
    $(".user-u").click(function(){
        var id = $(this).data("id");
        var settings = {
            "url": host+"user/get/"+id,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                    "Authorization": "AUTH="+token
                    }
          };

          $.ajax(settings).done(function (response) {
            console.log(response);
            $("#uid").val(id);
            $("#updateEmail").val(response.email);
            $("#updateUsername").val(response.name);
            $("#updateMobile").val(response.mobile);
            $("#updateAge").val(response.age);
          });
    });
    $(".user-d").click(function(){
        var id = $(this).data("id");
        if(confirm("Do you really want to delete this")){
            var settings = {
                "url": host+"user/delete/"+id,
                "method": "DELETE",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "AUTH="+token
                    }
              };

              $.ajax(settings).done(function (response) {
                console.log(response);
                readUsers();
              });
        }
    });
}


}


