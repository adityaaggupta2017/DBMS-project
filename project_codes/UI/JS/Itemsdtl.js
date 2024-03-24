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


let objCategory;
function ComboDy(dfVal){
    var stOptions="";
    for(var i = 0; i < objCategory.length; i++) {
            if (objCategory[i].CategoryID==dfVal){
                stOptions += "<option selected value='" + objCategory[i].CategoryID + "'>" + objCategory[i].Category_Name + "</option>";
            }
            else{
                stOptions += "<option value='" + objCategory[i].CategoryID + "'>" + objCategory[i].Category_Name + "</option>";
            }
        }
        return stOptions;
    }

function CategoryCombo(dfVal, CategoryList){
    var select = document.getElementById(CategoryList); 
    for(var i = 0; i < objCategory.length; i++) {
        var el = document.createElement("option");
        el.text = objCategory[i].Category_Name;
        el.value = objCategory[i].CategoryID;
        select.add(el);
        }
    }



function GetAjaxCategory() {
    //alert("H102");
    UpdateURL();
    $.ajax({
        type: "Get",
        url: BaseURL + "/ProjectDb/v2/Category/",
        contentType: "application/json",
        datatype: "json",
        async:false,
        //data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
        success: function (response) {
            //console.log("H1001",response);
            objCategory=response;
            
        },
        error: function (err) {

            console.log(err);
        }
    });
}


function UserInfojs(ProductID,Name_of_the_item,Availability,Description,Price,CategoryID,AdminID)
{
    this.ProductID = ProductID;
    this.Name_of_the_item = Name_of_the_item;
    this.Availability = Availability;
    this.Description = Description;
    this.Price = Price;
    this.CategoryID = CategoryID;
    this.AdminID = AdminID;

}

function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> ProductID </th><th>Name_of_the_item</th> <th>Availability</th> <th>Description</th><th>Price</th><th>CategoryID</th><th>AdminID</th><th>Delete Record</th><th>Update Record</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtProductID" + FnData[indx].ProductID + "' value='"+ FnData[indx].ProductID + "'> </td>" +  
                "<td><input type='text' id='" + "txtName_of_the_item" + FnData[indx].ProductID + "' value='"+ FnData[indx].Name_of_the_item + "'></td>" + 
                "<td><input type='text' id='" + "txtAvailability" + FnData[indx].ProductID + "' value='"+ FnData[indx].Availability + "'></td>" + 
                "<td><input type='text' id='" + "txtDescription" + FnData[indx].ProductID + "' value='"+ FnData[indx].Description + "'></td>" +
                "<td><input type='text' id='" + "txtPrice" + FnData[indx].ProductID + "' value='"+ FnData[indx].Price + "'></td>" +
                "<td><select id='" + "txtCategoryID" + FnData[indx].ProductID + "'>" + ComboDy(FnData[indx].CategoryID) + "</select></td>" +
                "<td><input type='text' id='" + "txtAdminID" + FnData[indx].ProductID + "' value='"+ FnData[indx].AdminID + "'></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxDeletedata(" + FnData[indx].ProductID + ")' value='Delete' /></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxUpdatedata(" + FnData[indx].ProductID + ")' value='Update' /></td></tr>";
    }
    vStr = vStr + "</table>";
    //console.log("Hfinal",vStr)
    document.getElementById("Div1").innerHTML = vStr;
}

function forOnload(){
    UpdateURL();
    GetAjaxCategory();
    CategoryCombo(1, "txtCategoryID");
    GetAjaxAllData();

}


function GetAjaxAllData() {
    
    $.ajax({
        type: "Get",
        url: BaseURL + "/ProjectDb/v2/Item/",
        contentType: "application/json",
        datatype: "json",
        //data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
        success: function (response) {

            //mstfilter = response;
            mstfilter = response;
            Getdata(mstfilter);
        },
        error: function (err) {
            console.log(err);
        }
    });
}



function AjaxInsertdata() {
    var CurrUsr = parent.GetAdminParentValue();
    var obj = new UserInfojs(0, $("#txtName_of_the_item").val(), $("#txtAvailability").val(), $("#txtDescription").val(), $("#txtPrice").val(), $("#txtCategoryID").val(), CurrUsr.AdminID);
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/Item/",
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
        url: BaseURL + "/ProjectDb/v2/Item/" + ID + "/",
        contentType: "application/json",
        datatype: "json",
        //data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            //console.log(Genmst);
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
    var obj = new UserInfojs($("#txtProductID" + ID).val(), $("#txtName_of_the_item" + ID).val(), $("#txtAvailability" + ID).val(), $("#txtDescription" + ID).val(), $("#txtPrice" + ID).val(), $("#txtCategoryID" + ID).val(), CurrUsr.AdminID);
  
    $.ajax({
        type: "PUT",
        url: BaseURL + "/ProjectDb/v2/Item/" + ID + "/",
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


