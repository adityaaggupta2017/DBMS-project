let x=1;
let y=7;
let z=y+2;
let k=2;
//BaseURL = "http://localhost:91"
//BaseURL = "http://127.0.0.1:8000"
//BaseURL = "https://calcsidea.azurewebsites.net"
function AdminMgmt(){
    window.location.href = "AdminManagement.html";
}

function UserInfojs(CategoryID,Category_Name)
{
    this.CategoryID = CategoryID;
    this.Category_Name = Category_Name;
}

function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> CategoryID </th><th>Category_Name</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtCategoryID" + FnData[indx].CategoryID + "' value='"+ FnData[indx].CategoryID + "'> </td>" +  
                "<td><input type='text' id='" + "txtCategory_Name" + FnData[indx].CategoryID + "' value='"+ FnData[indx].Category_Name + "'></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxDeletedata(" + FnData[indx].CategoryID + ")' value='Delete' /></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxUpdatedata(" + FnData[indx].CategoryID + ")' value='Update' /></td></tr>";

        //console.log(indx)
    }
    
   vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

}


function GetAjaxAllData() {
    UpdateURL();
    $.ajax({
        type: "Get",
        url: BaseURL + "/ProjectDb/v2/Category/",
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
    //var CurrUsr = parent.GetAdminParentValue();
    var obj = new UserInfojs(0, $("#txtCategory_Name").val());
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/Category/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            GetAjaxAllData();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function AjaxDeletedata(ID) {
    //var obj = new UserInfojs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());
    $.ajax({
        type: "DELETE",
        url: BaseURL + "/ProjectDb/v2/Category/" + ID + "/",
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
    //var CurrUsr = parent.GetAdminParentValue();
    var obj = new UserInfojs($("#txtPartnerID" + ID).val(), $("#txtCategory_Name" + ID).val());
  
    $.ajax({
        type: "PUT",
        url: BaseURL + "/ProjectDb/v2/Category/" + ID + "/",
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


