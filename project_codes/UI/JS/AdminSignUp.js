function AfterAdminLogin(){
    window.location.href = "AdminManagement.html";
}



/*
function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-bordered border-primary'> <tr><td> Slno </td><td>GenKeyID</td> <td>GenKeyDesc</td> <td>GenKeyType</td><td>Delete Record</td><td>Update Record</td></tr>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtSlno_" + FnData[indx].Slno + "' value='"+ FnData[indx].Slno + "'> </td>" +  
                "<td><input type='text' id='" + "txtUserID_" + FnData[indx].Slno + "' value='"+ FnData[indx].UserID + "'></td>" + 
                "<td><input type='text' id='" + "txtPWD_" + FnData[indx].Slno + "' value='"+ FnData[indx].PWD + "'></td>" + 
                "<td><input type='text' id='" + "txtUserName_" + FnData[indx].Slno + "' value='"+ FnData[indx].UserName + "'></td>" +
                "<td><input type='text' id='" + "txtEmailID_" + FnData[indx].Slno + "' value='"+ FnData[indx].EmailID + "'></td>" + 
                "<td><input type='text' id='" + "txtPhoneNo_" + FnData[indx].Slno + "' value='"+ FnData[indx].PhoneNo + "'></td>" +
                "<td><input type='button' onclick='AjaxDeletedata(" + FnData[indx].Slno + ")' value='Delete' /></td>" + 
                "<td><input type='button' onclick='AjaxUpdatedata(" + FnData[indx].Slno + ")' value='Update' /></td></tr>";

        //console.log(indx)
    }
    
   vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

}


function GetAjaxAllData() {
    UpdateURL();
    $.ajax({
        type: "Get",
        url: BaseURL + "/api1/v1/UserInfo/",
        contentType: "application/json",
        datatype: "json",
        //data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
        success: function (response) {

            //mstfilter = response;
            mstfilter = response;
            console.log(response);
            Getdata(mstfilter);
            

        },
        error: function (err) {

            console.log(err);
        }
    });
}
*/

let x=1;
let y=7;
let z=y+2;
let k=2;
//BaseURL = "http://localhost:91"
//BaseURL = "http://127.0.0.1:8000"
//BaseURL = "https://calcsidea.azurewebsites.net"


function AdminInfojs(AdminID,AdminName,PWD)
{
    this.AdminID = AdminID;
    this.AdminName = AdminName;
    this.PWD = PWD;
}

function GetAdminInfo(AdminName,PWD)
{
    this.AdminName = AdminName;
    this.PWD = PWD;
}

function GetGenInfo(ProcName,SQL2)
{
    this.ProcName = ProcName;
    this.SQL2 = SQL2;
}

function AjaxUserLogin() {
    UpdateURL();
    var obj = new GetGenInfo("ValidateAdmin","SELECT JSON_ARRAYAGG(JSON_OBJECT('AdminID',AdminID,'Admin_Name',Admin_Name,'password',password)) FROM admin where Admin_Name='" + $("#txtAdminName").val() + "'and password='" + $("#txtPWD").val() + "'");

    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response[0];
            //console.log("h3",response[0]);
            //alert(ResObj)
            showAdminLoginData(ResObj);
        },
        error: function (err) {
            console.log(err);
            alert("Admin Name or Password not correct. Please check.");
        }
    });
}

function showAdminLoginData(ResData){
    $("#txtAdminName").val(ResData.AdminName);
    $("#txtPWD").val(ResData.PWD);
    parent.showAdminLoginData(ResData); // = $("#Slno").val();
    alert("Login Successfully!");
    window.location.href = "AdminManagement.html";
   
}


function RemoveUserDetails(){
    parent.RemoveParentValue();
    window.location.href = "Index1.html";
}





function AjaxInsertdata() {
    UpdateURL();
    if (ValidateReg()==1){return}
    var obj = new UserInfojs($("#Slno").val(), $("#UserID").val(), $("#PWD").val(), $("#UserName").val(), $("#EmailID").val(), $("#PhoneNo").val());
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/api1/v1/UserInfo/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            //console.log(response);
            showRegUserResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            alert("UserID not available, please select different ID.");
        }
    });
}

function AjaxDeletedata(ID) {
    UpdateURL();
    var CurrUsr = parent.GetParentValue()
    $.ajax({
        type: "DELETE",
        url: BaseURL + "/api1/v1/UserInfo/" + CurrUsr.Slno + "/",
        contentType: "application/json",
        datatype: "json",
        //data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            //console.log(ResObj);
            //Getdata(Genmst);
            RemoveUserDetails();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function AjaxUpdatedata() {
   UpdateURL();
   if (ValidateReg()==1){return}

   var CurrUsr = parent.GetParentValue()
   var obj = new UserInfojs(CurrUsr.Slno, $("#UserID").val(), $("#PWD").val(), $("#UserName").val(), $("#EmailID").val(), $("#PhoneNo").val());
    $.ajax({
        type: "PUT",
        url: BaseURL + "/api1/v1/UserInfo/" + obj.Slno + "/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            //console.log("H67",ResObj);
            showUpdatedUserResData(ResObj);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function validatePassword() 
    {
    var pw=$("#PWD").val()
    return /[a-z]/       .test(pw) &&
           /[0-9]/       .test(pw) &&
           pw.length > 5;
           /*
           /[A-Z]/       .test(pw) &&
           /[^A-Za-z0-9]/.test(pw) &&
           */
    }
function validateUserID() 
    {
    var pw=$("#UserID").val()
    return pw.length > 5;
    }

function validateUserName() 
    {
    var pw=$("#UserName").val()
    return pw.length > 5;
    }

function validateEmail() 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test($("#EmailID").val());
    }
    
function validatePhone() 
    {
    var pw=$("#PhoneNo").val()
    if(pw.length == 10)
    {
        return true;
    }
    else
    {
        return false;
    }
    }


function ValidateReg(){
    //alert(validatePassword());
    var i=0
    if (!validateUserID())
    {
        alert("User ID should be > 5 char.")
        i=1;
    }
    if (!validatePassword())
    {
        alert("Password length should be > 5, have a-z and 0-9 char.")
        i=1;
    }
    if (!validateUserName())
    {
        alert("User Name should be > 5 char.")
        i=1;
    }
    if (!validateEmail())
    {
        alert("Please enter valid Email")
        i=1;
    }
    if (!validatePhone())
    {
        alert("Please Enter valid Phone No.")
        i=1;
    }

    
    return i;
    
}


function Validatelogin(){
    if (!validateUserID())
    {
        alert("User ID should be > 5 char.")
    }
    if (!validatePassword())
    {
        alert("Password length should be > 5, have a-z and 0-9 char.")
    }

}