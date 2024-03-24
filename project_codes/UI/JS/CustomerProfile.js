function fnOrderdtl(){
    window.location.href = "OrderMgmt.html";
}

let x=1;
let y=7;
let z=y+2;
let k=2;


function UserInfojs(Name_of_the_customer,Delivery_Address,Email_Address,password,Phone_number)
{
    this.Name_of_the_customer = Name_of_the_customer;
    this.Delivery_Address = Delivery_Address;
    this.Email_Address = Email_Address;
    this.password = password;
    this.Phone_number = Phone_number;
    this.AdminID = 1;

}

function UserInfoUpdatejs(customer_id,Name_of_the_customer,Delivery_Address,Email_Address,password,Phone_number)
{   
    this.customer_id = customer_id;
    this.Name_of_the_customer = Name_of_the_customer;
    this.Delivery_Address = Delivery_Address;
    this.Email_Address = Email_Address;
    this.password = password;
    this.Phone_number = Phone_number;
    this.AdminID = 1;

}


function RemoveUserDetails(){
    parent.RemoveParentValue();
    window.location.href = "Index1.html";
}


function showRegUserResData(ResData){
    $("#txtCustID").val(ResData.customer_id);
    $("#txtName").val(ResData.Name_of_the_customer);
    $("#txtAddress").val(ResData.Delivery_Address);
    $("#txtEmail").val(ResData.Email_Address);
    $("#txtPWD").val(ResData.password);
    $("#txtPhone").val(ResData.Phone_number);
    parent.showUserLoginData(ResData);
    alert("Registered Successfully!")
    window.location.href = "OrderMgmt.html";

}

function showUpdatedUserResData(ResData){
    $("#txtCustID").val(ResData.customer_id);
    $("#txtName").val(ResData.Name_of_the_customer);
    $("#txtAddress").val(ResData.Delivery_Address);
    $("#txtEmail").val(ResData.Email_Address);
    $("#txtPWD").val(ResData.password);
    $("#txtPhone").val(ResData.Phone_number);
    parent.showUserLoginData(ResData);
    alert("User Information Updated Successfully!")
    window.location.href = "OrderMgmt.html";

}

function showUserLoginResData(ResData){
    $("#UserID").val(ResData.UserID);
    $("#PWD").val(ResData.PWD);
    parent.SetParentValue(ResData); // = $("#Slno").val();
    //alert("Login Successfully!");
    window.location.href = "DefaultPage.html";
   
}

function showUserDetails(){
    var ResData = parent.GetUserParentValue();
    if (ResData){
    $("#txtCustID").val(ResData.customer_id);
    $("#txtName").val(ResData.Name_of_the_customer);
    $("#txtAddress").val(ResData.Delivery_Address);
    $("#txtEmail").val(ResData.Email_Address);
    $("#txtPWD").val(ResData.password);
    $("#txtPhone").val(ResData.Phone_number);
    }
    else
    {
        alert("Please Login");
        window.location.href = "CustomerSignUp.html";
    }
}


function RemoveUserDetails(){
    parent.RemoveParentValue();
    window.location.href = "UserLogin.html";
}


function AjaxUserLogin() {
    UpdateURL();
    var obj = new GetUserInfo($("#UserID").val(), $("#PWD").val());
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/api1/v1/UserLogin/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            //console.log(response);
            showUserLoginResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            alert("UserID or Password not correct. Please check.");
        }
    });
}


function AjaxInsertCustdata() {
    UpdateURL();
   // if (ValidateReg()==1){return}
    var obj = new UserInfojs($("#txtName").val(),$("#txtAddress").val(),$("#txtEmail").val(),$("#txtPWD").val(),$("#txtPhone").val());
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/customers/",
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
            alert("Email ID not available, please select different ID.");
        }
    });
}

function AjaxDeletedata(ID) {
    UpdateURL();
    var CurrUsr = parent.GetUserParentValue()
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
   //if (ValidateReg()==1){return}

   var CurrUsr = parent.GetUserParentValue()
   var obj = new UserInfoUpdatejs($("#txtCustID").val(),$("#txtName").val(),$("#txtAddress").val(),$("#txtEmail").val(),$("#txtPWD").val(),$("#txtPhone").val());
    $.ajax({
        type: "PUT",
        url: BaseURL + "/ProjectDb/v2/customers/" + obj.customer_id + "/",
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
            alert("Email ID not available, please select different ID.");
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


/*
var mstfilter;
var mstfilter1;
var indx;

function GetAjaxAllData2() {
    UpdateURL()
    console.log("h0",x,y)

    $.ajax({
        type: "POST",
        url: BaseURL + "/api1/v1/Fun/",
        contentType: "application/json",
        datatype: "json",
        //'{"m":4,"n":6}',
        data: '{"m":' + x  + ',"n":' + y + '}',
        success: function (response) {

            //mstfilter = response;
            mstfilter5 = response;
            z=mstfilter5[0]["Count"];
            Getdata(mstfilter5);
        },
        error: function (err) {
            console.log(err);
        }
        
    });

    console.log("h6",x,y)
}

function GetAjaxAllData2_N() {
    console.log("h1",x,y)
    if (x+y < z)
    {
        x = x + y; //$("#StartRow").val() + $("#Rowcount").val() + 1
    }
    console.log("h2",x,y)
    GetAjaxAllData2()
}

function GetAjaxAllData2_P() {
    console.log("h3",x,y)
    
    if (x - y > 0)
    {
        x = x - y; //$("#StartRow").val() + $("#Rowcount").val() + 1
    }
    console.log("h4",x,y)
    GetAjaxAllData2()
}


var Genmst = [{ "Slno": 1, "GenKeyID": "64", "GenKeyDesc": "anjula", "GenKeyType": "abc" }, 
{ "Slno": 2, "GenKeyID": "RPY", "GenKeyDesc": "Residential Property", "GenKeyType": "PropertyType" },
{ "Slno": 3, "GenKeyID": "APT", "GenKeyDesc": "Apartment", "GenKeyType": "PropertyType" }, 
{ "Slno": 4, "GenKeyID": "IHV", "GenKeyDesc": "Independent House\/Villa", "GenKeyType": "PropertyType" }, 
{ "Slno": 5, "GenKeyID": "IBF", "GenKeyDesc": "Independent\/Builder Floor", "GenKeyType": "PropertyType" }, 
{ "Slno": 6, "GenKeyID": "PLD", "GenKeyDesc": "Plot\/Land", "GenKeyType": "PropertyType" }, { "Slno": 7, "GenKeyID": "FMH", "GenKeyDesc": "Farm House", "GenKeyType": "PropertyType" }, { "Slno": 8, "GenKeyID": "SSA", "GenKeyDesc": "Service\/Studio Apartment", "GenKeyType": "PropertyType" }, { "Slno": 9, "GenKeyID": "ORL", "GenKeyDesc": "Other Residential", "GenKeyType": "PropertyType" }, { "Slno": 10, "GenKeyID": "IDL", "GenKeyDesc": "Individual", "GenKeyType": "Profile" }, { "Slno": 11, "GenKeyID": "Agent", "GenKeyDesc": "Agent-Broker", "GenKeyType": "Profile" }, { "Slno": 12, "GenKeyID": "Builder", "GenKeyDesc": "Builder", "GenKeyType": "Profile" }, { "Slno": 13, "GenKeyID": "Delhi", "GenKeyDesc": "Delhi", "GenKeyType": "Area" }, { "Slno": 14, "GenKeyID": "Noida", "GenKeyDesc": "Noida", "GenKeyType": "Area" }, { "Slno": 15, "GenKeyID": "Gurgaon", "GenKeyDesc": "Gurgaon", "GenKeyType": "Area" }, { "Slno": 16, "GenKeyID": "INDIA", "GenKeyDesc": "INDIA", "GenKeyType": "Country" }, { "Slno": 17, "GenKeyID": "1", "GenKeyDesc": "Min 1 Bedroom", "GenKeyType": "BHKType" }, { "Slno": 18, "GenKeyID": "2", "GenKeyDesc": "Min 2 Bedroom", "GenKeyType": "BHKType" }, { "Slno": 19, "GenKeyID": "3", "GenKeyDesc": "Min 3 Bedroom", "GenKeyType": "BHKType" }, { "Slno": 20, "GenKeyID": "4", "GenKeyDesc": "Min 4 Bedroom", "GenKeyType": "BHKType" }, { "Slno": 21, "GenKeyID": "5", "GenKeyDesc": "Min 5 Bedroom", "GenKeyType": "BHKType" }, { "Slno": 22, "GenKeyID": "1000000", "GenKeyDesc": "10 lacs", "GenKeyType": "Budget" }, { "Slno": 23, "GenKeyID": "1500000", "GenKeyDesc": "15  lacs", "GenKeyType": "Budget" }, { "Slno": 24, "GenKeyID": "2000000", "GenKeyDesc": "20lacs", "GenKeyType": "Budget" }, { "Slno": 25, "GenKeyID": "3000000", "GenKeyDesc": "30 lacs", "GenKeyType": "Budget" }];



function GetAjaxAllData() {
    
    $.ajax({
        type: "Get",
        url: BaseURL + "/api1/v1/GenricMaster/",
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

function GetAjaxAllData1(Type) {
    
    $.ajax({
        type: "Get",
       // url: "http://localhost:91/api1/v1/GenricMaster?GenKeyType=PropertyType",
        url: BaseURL + "/api1/v1/GenricMaster/?GenKeyType=" + Type,
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

function fn_Ajax() {
    
    $.ajax({
        type: "POST",
        url: "http://anjulapc1:85/DALWS1.asmx/GetPropData",
        contentType: "application/json",
        datatype: "json",
        data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
        success: function (response) {

            //mstfilter = response;
            mstfilter = response.d;
            console.log(response.d);
            Getdata();
            

        },
        error: function (err) {

            console.log(err);
        }
    });
}

function UserInfojs(Slno,GenKeyID,GenKeyDesc,GenKeyType)
{
    this.Slno = Slno;
    this.GenKeyID = GenKeyID;
    this.GenKeyDesc = GenKeyDesc;
    this.GenKeyType = GenKeyType;
}








function Searchdata() {

    var SubGenstr = $(Genmst).filter(function (i) { return Genmst[i].GenKeyType === $("#tb_GenKeyType").val() });
    mstfilter = SubGenstr;
    Getdata();
  

}

function AjaxInsertdata() {

    //var objtoinsert = { "Slno": $("#tb_Slno").val(), "GenKeyID": $("#tb_GenKeyID").val(), "GenKeyDesc": $("#tb_GenKeyDesc").val(),"GenKeyType": $("#tb_GenKeyType").val()};

    var obj = new UserInfojs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

    alert(JSON.stringify(obj));
    alert('{"strType":' + JSON.stringify(obj) + '}');
    

    //var stjson = "{ ""strType"": { ""Slno"": ""2"", ""GenKeyID"": ""new8"", ""GenKeyDesc"": ""new8"", ""GenKeyType"": ""PropertyType"" } }"; //"{'strType': '" + obj + "'}";

    $.ajax({
        type: "POST",
        url: "http://anjulapc1:85/DALWS1.asmx/InsertPropData",
        contentType: "application/json",
        datatype: "json",
        data: '{"strType":' +  JSON.stringify(obj) + '}',
        success: function (response) {

            //mstfilter = response;
            mstfilter = response.d;
            console.log(response.d);
            Getdata();


        },
        error: function (err) {

            console.log(err);
        }
    });


    //Genmst.push(objtoinsert);
    //console.log(objtoinsert);
    //Getdata();
}

function Updatedata() {


    //var vlength = Genmst.length;

    //for (indx = 0; indx < vlength; indx++) {

    //    if (Genmst[indx].Slno == $("#tb_Slno").val()) 
    //    {
    //        Genmst[indx].GenKeyID = $("#tb_GenKeyID").val();
    //        Genmst[indx].GenKeyDesc = $("#tb_GenKeyDesc").val();
    //        Genmst[indx].GenKeyType = $("#tb_GenKeyType").val();
        
    //    }
    //}


    //Getdata();


    var obj = new UserInfojs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

    alert(JSON.stringify(obj));
    alert('{"strType":' + JSON.stringify(obj) + '}');


    //var stjson = "{ ""strType"": { ""Slno"": ""2"", ""GenKeyID"": ""new8"", ""GenKeyDesc"": ""new8"", ""GenKeyType"": ""PropertyType"" } }"; //"{'strType': '" + obj + "'}";

    $.ajax({
        type: "POST",
        url: "http://anjulapc1:85/DALWS1.asmx/UpdatePropData",
        contentType: "application/json",
        datatype: "json",
        data: '{"strType":' + JSON.stringify(obj) + '}',
        success: function (response) {

            //mstfilter = response;
            mstfilter = response.d;
            console.log(response.d);
            Getdata();


        },
        error: function (err) {

            console.log(err);
        }
    });





}


function deletedata() {

   
    //for (indx = 0; indx < Genmst.length; indx++) {

    //    if (Genmst[indx].Slno == $("#tb_Slno").val()) {

    //        Genmst.splice(indx, 1);

    //    }
    //}


    //Getdata();


    var obj = new UserInfojs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

    alert(JSON.stringify(obj));
    alert('{"strType":' + JSON.stringify(obj) + '}');


    //var stjson = "{ ""strType"": { ""Slno"": ""2"", ""GenKeyID"": ""new8"", ""GenKeyDesc"": ""new8"", ""GenKeyType"": ""PropertyType"" } }"; //"{'strType': '" + obj + "'}";

    $.ajax({
        type: "POST",
        url: "http://anjulapc1:85/DALWS1.asmx/DeletePropData",
        contentType: "application/json",
        datatype: "json",
        data: '{"strType":' + JSON.stringify(obj) + '}',
        success: function (response) {

            //mstfilter = response;
            mstfilter = response.d;
            console.log(response.d);
            Getdata();


        },
        error: function (err) {

            console.log(err);
        }
    });

    }

function Insert() 
{
    //Yo = '{"Slno": ' + document.getElementById("tb_Slno").value  + ', "GenKeyID": "' + document.getElementById("tb_GenKeyID").value  + '", "GenKeyDesc": "' + document.getElementById("tb_GenKeyDesc").value  + '", "GenKeyType": "' + document.getElementById("tb_GenKeyType").value  + '" }'
    Yo = {"Slno":parseInt(document.getElementById("tb_Slno").value), "GenKeyID":document.getElementById("tb_GenKeyID").value, "GenKeyDesc": document.getElementById("tb_GenKeyDesc").value,"GenKeyType":document.getElementById("tb_GenKeyType").value};
    Genmst.push(Yo);
    console.log(Genmst);
    //console.log(document.getElementById("SLno7").value);
    loaddata();
}

function Update() 
{
    Yo = '{"Slno": "' + document.getElementById("tb_Slno").value  + '", "GenKeyID": "' + document.getElementById("tb_GenKeyID").value  + '", "GenKeyDesc": "' + document.getElementById("tb_GenKeyDesc").value  + '", "GenKeyType": "' + document.getElementById("tb_GenKeyType").value  + '" }'
    Genmst.push(Yo);
    console.log(Genmst);
    //console.log(document.getElementById("SLno7").value);
    loaddata();
}


function Delete() 
{
    Yo = '{"Slno": "' + document.getElementById("tb_Slno").value  + '", "GenKeyID": "' + document.getElementById("tb_GenKeyID").value  + '", "GenKeyDesc": "' + document.getElementById("tb_GenKeyDesc").value  + '", "GenKeyType": "' + document.getElementById("tb_GenKeyType").value  + '" }'
    Genmst.pop(Yo);
    console.log(Genmst);
    //console.log(document.getElementById("SLno7").value);
    loaddata();
}

*/
