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
function BacktoShopping(){
    window.location.href = "Shopping.html";
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
    //UpdateURL();
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

////////////////////////Vendor Combo//////////////////////////////////////

let objVendor;
function ComboVendorDy(dfVal){
    var stOptions="";
    for(var i = 0; i < objVendor.length; i++) {
            if (objVendor[i].VendorID==dfVal){
                stOptions += "<option selected value='" + objVendor[i].VendorID + "'>" + objVendor[i].Name_of_the_vendor + "</option>";
            }
            else{
                stOptions += "<option value='" + objVendor[i].VendorID + "'>" + objVendor[i].Name_of_the_vendor + "</option>";
            }
        }
        return stOptions;
    }


    function GetAjaxVendor() {
        //alert("H102");
        //UpdateURL();
        $.ajax({
            type: "Get",
            url: BaseURL + "/ProjectDb/v2/Vendor/",
            contentType: "application/json",
            datatype: "json",
            async:false,
            //data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
            success: function (response) {
                //console.log("H1001",response);
                objVendor=response;
                
            },
            error: function (err) {
    
                console.log(err);
            }
        });
    }







/////////////////////////////////////////////////////////////////////

function ComboPaymentMode(dfVal){
    var stOptions="";
    
           if (dfVal=="cash"){
                stOptions += "<option selected value='cash'>cash</option>";
                stOptions += "<option value='UPI'>UPI</option>";
            }
            else{
                stOptions += "<option value='Cash'>Cash</option>";
                stOptions += "<option selected value='UPI'>UPI</option>";
            }
            return stOptions;
        }
        
    

////////////////////////Partner Combo//////////////////////////////////////

let objPartner;
function ComboPartnerDy(dfVal){
    var stOptions="";
    for(var i = 0; i < objPartner.length; i++) {
            if (objPartner[i].PartnerID==dfVal){
                stOptions += "<option selected value='" + objPartner[i].PartnerID + "'>" + objPartner[i].Name_of_the_partner + "</option>";
            }
            else{
                stOptions += "<option value='" + objPartner[i].PartnerID + "'>" + objPartner[i].Name_of_the_partner + "</option>";
            }
        }
        return stOptions;
    }


    function GetAjaxPartner() {
        //alert("H102");
        //UpdateURL();
        $.ajax({
            type: "Get",
            url: BaseURL + "/ProjectDb/v2/DeliveryPartner/",
            contentType: "application/json",
            datatype: "json",
            async:false,
            //data: "{'strType': '" + $("#tb_GenKeyType").val() + "'}",
            success: function (response) {
                //console.log("H1001",response);
                objPartner=response;
                
            },
            error: function (err) {
    
                console.log(err);
            }
        });
    }










/////////////////////////////////////////////////////////////////////


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
    
  
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> Product ID </th><th>Quantity</th> <th>price</th><th>Mode_of_payment</th><th>PartnerID</th><th>VendorID</th><th>CategoryID</th></th><th>Delete Record</th><th>Update Record</th></tr></thead>";

    for (indx = 0; indx < vlength; indx++)
    {
        //alert(ComboVendorDy(FnData[indx].VendorID));
        vStr += "<td><input type='text' id='" + "txtItemID" + FnData[indx].ID + "' value='"+ FnData[indx].ItemID + "'></td>" + 
                "<td><input type='text' id='" + "txtQuantity" + FnData[indx].ID + "' value='"+ FnData[indx].Quantity + "'></td>" + 
                "<td><input type='text' id='" + "txtprice" + FnData[indx].ID + "' value='"+ FnData[indx].price + "'></td>" + 
                //"<td><input type='text' id='" + "txtMode_of_payment" + FnData[indx].ID + "' value='"+ FnData[indx].Mode_of_payment + "'></td>" + 
                //"<td><input type='text' id='" + "txtPartnerID" + FnData[indx].ID + "' value='"+ FnData[indx].PartnerID + "'></td>" +
                //"<td><input type='text' id='" + "txtVendorID" + FnData[indx].ID + "' value='"+ FnData[indx].VendorID + "'></td>" + 
                "<td><select id='" + "txtMode_of_payment" + FnData[indx].ID + "'>" + ComboPaymentMode(FnData[indx].Mode_of_payment) + "</select></td>" +
                "<td><select id='" + "txtPartnerID" + FnData[indx].ID + "'>" + ComboPartnerDy(FnData[indx].PartnerID) + "</select></td>" +
                "<td><select id='" + "txtVendorID" + FnData[indx].ID + "'>" + ComboVendorDy(FnData[indx].VendorID) + "</select></td>" +
                "<td><select id='" + "txtCategoryID" + FnData[indx].ID + "'>" + ComboDy(FnData[indx].CategoryID) + "</select></td>" +
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxDeleteItem(" + FnData[indx].ID + ")' value='Delete' /></td>" + 
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxUpdatedata(" + FnData[indx].ID + ")' value='Update' /></td></tr>";
    }
    vStr = vStr + "</table>";
    //console.log("Hfinal",vStr)
    document.getElementById("Div1").innerHTML = vStr;
}

function forOnload(){
    UpdateURL();
    GetAjaxCategory();
    GetAjaxVendor();
    GetAjaxPartner();//CategoryCombo(1, "txtCategoryID");
    AjaxGetCartDtl();

}

function GetGenInfo(ProcName,SQL1,SQL2)
{
    this.ProcName = ProcName;
    this.SQL1 = SQL1;
    this.SQL2 = SQL2;
}

let stCartID
function AjaxGetCartDtl() {
    //stCartID=2;
    if (parent.GetPCartID())
        {
            stCartID = parent.GetPCartID();
            $("#txtCartID").val(stCartID);
            //return;
        }
    var obj = new GetGenInfo("Exec2SQL","delete from log1 where 1=2","Select JSON_ARRAYAGG(JSON_OBJECT('ID',ID,'CartID',CartID,'ItemID',ItemID,'Quantity',Quantity,'price',price,'OrderDate',OrderDate,'Mode_of_payment',Mode_of_payment,'Trip_Status',Trip_Status,'CustomerID',CustomerID,'PartnerID',PartnerID,'VendorID',VendorID,'CategoryID',CategoryID)) from shoppingcart where cartid=" + stCartID);
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            //alert("H103");
            ResObj=response;
            console.log("h55",ResObj);
            Getdata(ResObj);
        },
        error: function (err) {
            console.log(err);
        }
    });
}



function AjaxDeleteItem(ID) {
    var obj = new GetGenInfo("Exec2SQL","delete from shoppingcart where ID=" + ID,"Select JSON_ARRAYAGG(JSON_OBJECT('ID',ID,'CartID',CartID,'ItemID',ItemID,'Quantity',Quantity,'price',price,'OrderDate',OrderDate,'Mode_of_payment',Mode_of_payment,'Trip_Status',Trip_Status,'CustomerID',CustomerID,'PartnerID',PartnerID,'VendorID',VendorID,'CategoryID',CategoryID)) from shoppingcart where cartid=" + stCartID);
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            //alert("H103");
            ResObj=response;
            console.log("h55",ResObj);
            Getdata(ResObj);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function GetGenInfo2(ProcName,SQL1,SQL2,SQL3)
{
    this.ProcName = ProcName;
    this.SQL1 = SQL1;
    this.SQL2 = SQL2;
    this.SQL3 = SQL3;
}

function PlaceFinalOrder() {
    var obj = new GetGenInfo2("Exec3SQL","insert into orderid () values ()","INSERT INTO `order`(`OrderID`,`ItemID`,`Quantity`,`price`,`OrderDate`,`Mode_of_payment`,`Trip_Status`,`CustomerID`,`PartnerID`,`VendorID`,`CategoryID`) select (select max(OrderID) from orderid) `OrderID`,`ItemID`,`Quantity`,`price`,`OrderDate`,`Mode_of_payment`,`Trip_Status`,`CustomerID`,`PartnerID`,`VendorID`,`CategoryID` from shoppingcart where CartID =" + stCartID,"Select JSON_ARRAYAGG(JSON_OBJECT('ID',ID,'CartID',CartID,'ItemID',ItemID,'Quantity',Quantity,'price',price,'OrderDate',OrderDate,'Mode_of_payment',Mode_of_payment,'Trip_Status',Trip_Status,'CustomerID',CustomerID,'PartnerID',PartnerID,'VendorID',VendorID,'CategoryID',CategoryID)) from shoppingcart where cartid=" + stCartID);
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            //alert("H103");
            ResObj=response;
            console.log("h55",ResObj);
            stCartID="";
            parent.RemovePCartID();
            alert("Thanks! Final Order Placed");
            window.location.href = "OrderDtls.html";
            //Getdata(ResObj);
        },
        error: function (err) {
            console.log(err);
        }
    });
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


