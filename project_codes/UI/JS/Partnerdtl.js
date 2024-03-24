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

function UserInfojs(PartnerID,Name_of_the_partner,Vehicle_Details,Phone_number,AdminID)
{
    this.PartnerID = PartnerID;
    this.Name_of_the_partner = Name_of_the_partner;
    this.Vehicle_Details = Vehicle_Details;
    this.Phone_number = Phone_number;
    this.AdminID = AdminID;

}

function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> PartnerID </td><td>Name_of_the_partner</th> <th>Vehicle_Details</th> <th>Phone_number</th><th>Admin ID</th><th>Delete Record</th><th>Update Record</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtPartnerID" + FnData[indx].PartnerID + "' value='"+ FnData[indx].PartnerID + "'> </td>" +  
                "<td><input type='text' id='" + "txtName_of_the_partner" + FnData[indx].PartnerID + "' value='"+ FnData[indx].Name_of_the_partner + "'></td>" + 
                "<td><input type='text' id='" + "txtVehicle_Details" + FnData[indx].PartnerID + "' value='"+ FnData[indx].Vehicle_Details + "'></td>" + 
                "<td><input type='text' id='" + "txtPhone_number" + FnData[indx].PartnerID + "' value='"+ FnData[indx].Phone_number + "'></td>" +
                "<td><input type='text' id='" + "txtAdminID" + FnData[indx].PartnerID + "' value='"+ FnData[indx].AdminID + "'></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxDeletedata(" + FnData[indx].PartnerID + ")' value='Delete' /></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxUpdatedata(" + FnData[indx].PartnerID + ")' value='Update' /></td></tr>";

        //console.log(indx)
    }
    
   vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

}


function GetAjaxAllData() {
    UpdateURL();
    $.ajax({
        type: "Get",
        url: BaseURL + "/ProjectDb/v2/DeliveryPartner/",
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
    var obj = new UserInfojs(0, $("#txtName_of_the_partner").val(), $("#txtVehicle_Details").val(), $("#txtPhone_number").val(), CurrUsr.AdminID);
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/DeliveryPartner/",
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
        url: BaseURL + "/ProjectDb/v2/DeliveryPartner/" + ID + "/",
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
    var obj = new UserInfojs($("#txtPartnerID" + ID).val(), $("#txtName_of_the_partner" + ID).val(), $("#txtVehicle_Details" + ID).val(), $("#txtPhone_number" + ID).val(), CurrUsr.AdminID);
  
    $.ajax({
        type: "PUT",
        url: BaseURL + "/ProjectDb/v2/DeliveryPartner/" + ID + "/",
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


