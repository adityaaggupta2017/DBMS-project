let x=1;
let y=7;
let z=y+2;
let k=2;
//BaseURL = "http://localhost:91"
//BaseURL = "http://127.0.0.1:8000"
//BaseURL = "https://calcsidea.azurewebsites.net"


function UserInfojs(Name_of_the_customer ,  password , Delivery_Address) 
{   
    this.Name_of_the_customer = Name_of_the_customer; 
    this.Delivery_Address = Delivery_Address;
    this.password = password;
    this.AdminID = 1 ;
}


function callfuns1(){
    let x ;
    AjaxInsertdata() ; 
    
  }
// function Getdata(FnData) {
//     var vlength = FnData.length;
    
//     var vStr = "<table border=1 class='table table-bordered border-primary'> <tr><td> Slno </td><td>GenKeyID</td> <td>GenKeyDesc</td> <td>GenKeyType</td><td>Delete Record</td><td>Update Record</td></tr>";
//     for (indx = 0; indx < vlength; indx++)
//     {
//         vStr += "<tr><td><input type='text' id='" + "txtSlno_" + FnData[indx].Slno + "' value='"+ FnData[indx].Slno + "'> </td>" +  
//                 "<td><input type='text' id='" + "txtUserID_" + FnData[indx].Slno + "' value='"+ FnData[indx].UserID + "'></td>" + 
//                 "<td><input type='text' id='" + "txtPWD_" + FnData[indx].Slno + "' value='"+ FnData[indx].PWD + "'></td>" + 
//                 "<td><input type='text' id='" + "txtUserName_" + FnData[indx].Slno + "' value='"+ FnData[indx].UserName + "'></td>" +
//                 "<td><input type='text' id='" + "txtEmailID_" + FnData[indx].Slno + "' value='"+ FnData[indx].EmailID + "'></td>" + 
//                 "<td><input type='text' id='" + "txtPhoneNo_" + FnData[indx].Slno + "' value='"+ FnData[indx].PhoneNo + "'></td>" +
//                 "<td><input type='button' onclick='AjaxDeletedata(" + FnData[indx].Slno + ")' value='Delete' /></td>" + 
//                 "<td><input type='button' onclick='AjaxUpdatedata(" + FnData[indx].Slno + ")' value='Update' /></td></tr>";

//         //console.log(indx)
//     }
    
//    vStr = vStr + "</table>";
//     document.getElementById("Div1").innerHTML = vStr;

// }


function GetAjaxAllData() {
    // UpdateURL();
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



function AjaxInsertdata() {
    var obj = new UserInfojs($("#username").val(), $("#password").val(), $("#address").val());
    alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/customers/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            alert("I am here")  ;
            Genmst=[response];
            console.log(Genmst);
            // GetAjaxAllData();
        },
        error: function (err) {
            alert("I am here2")  ;
            console.log(err);
        }
    });
}

function AjaxDeletedata(ID) {
    //var obj = new UserInfojs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());
    $.ajax({
        type: "DELETE",
        url: BaseURL + "/api1/v1/UserInfo/" + ID + "/",
        contentType: "application/json",
        datatype: "json",
        //data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            //Getdata(Genmst);
            GetAjaxAllData();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function AjaxUpdatedata(ID) {
    //st1='#txtGenKeyID_' + ID
    alert(ID);
   // console.log($(st1).val())
   // console.log($('#txtGenKeyDesc_' + ID).val())
    //console.log($('#txtGenKeyType_' + ID).val())

    var obj = new UserInfojs($("#txtSlno_" + ID).val(), $("#txtUserID_" + ID).val(), $("#txtPWD_" + ID).val(), $("#txtUserName_" + ID).val(), $("#txtEmailID_" + ID).val(), $("#txtPhoneNo_" + ID).val());
   // console.log("1111111111111111111111");
    console.log("H1",JSON.stringify(obj));
   // console.log("11111111111111111111111111");
   
    $.ajax({
        type: "PUT",
        url: BaseURL + "/api1/v1/UserInfo/" + ID + "/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            //Getdata(Genmst);
            GetAjaxAllData();
        },
        error: function (err) {
            console.log(err);
        }
    });
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