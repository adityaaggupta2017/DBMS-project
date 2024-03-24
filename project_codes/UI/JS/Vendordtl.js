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

function UserInfojs(VendorID,Name_of_the_vendor,Contact_Details,Address,AdminID)
{
    this.VendorID = VendorID;
    this.Name_of_the_vendor = Name_of_the_vendor;
    this.Contact_Details = Contact_Details;
    this.Address = Address;
    this.AdminID = AdminID;

}

function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> VendorID </td><td>Name_of_the_vendor</th> <th>Phone</th> <th>Address</th><th>Admin ID</th><th>Delete Record</th><th>Update Record</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtVendorID" + FnData[indx].VendorID + "' value='"+ FnData[indx].VendorID + "'> </td>" +  
                "<td><input type='text' id='" + "txtName_of_the_vendor" + FnData[indx].VendorID + "' value='"+ FnData[indx].Name_of_the_vendor + "'></td>" + 
                "<td><input type='text' id='" + "txtContact_Details" + FnData[indx].VendorID + "' value='"+ FnData[indx].Contact_Details + "'></td>" + 
                "<td><textarea row='2' id='" + "txtAddress" + FnData[indx].VendorID + "'>" + FnData[indx].Address + "</textarea></td>" +
                "<td><input type='text' id='" + "txtAdminID" + FnData[indx].VendorID + "' value='"+ FnData[indx].AdminID + "'></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxDeletedata(" + FnData[indx].VendorID + ")' value='Delete' /></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxUpdatedata(" + FnData[indx].VendorID + ")' value='Update' /></td></tr>";

        //console.log(indx)
    }
    
   vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

}


function GetAjaxAllData() {
    UpdateURL();
    $.ajax({
        type: "Get",
        url: BaseURL + "/ProjectDb/v2/Vendor/",
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
    var CurrUsr = parent.GetAdminParentValue();
    var obj = new UserInfojs(0, $("#txtName_of_the_vendor").val(), $("#txtContact_Details").val(), $("#txtAddress").val(), CurrUsr.AdminID);
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/Vendor/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response[0]];
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
        url: BaseURL + "/ProjectDb/v2/Vendor/" + ID + "/",
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
    var CurrUsr = parent.GetAdminParentValue();
    var obj = new UserInfojs($("#txtVendorID" + ID).val(), $("#txtName_of_the_vendor" + ID).val(), $("#txtContact_Details" + ID).val(), $("#txtAddress" + ID).val(), CurrUsr.AdminID);
  
    $.ajax({
        type: "PUT",
        url: BaseURL + "/ProjectDb/v2/Vendor/" + ID + "/",
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


