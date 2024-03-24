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

function showCart(){
    window.location.href = "CartDetails.html";
}

function showOrderMgmt(){
    //$("#txtEmail").val(ResData.Email_Address);
    //$("#txtPWD").val(ResData.password);
    //parent.showUserLoginData(ResData); // = $("#Slno").val();
    //alert("Login Successfully!");
    window.location.href = "OrderMgmt.html";
   
}

////// Get Category Combo /////
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
    var el = document.createElement("option");
        el.text = "All";
        el.value = "CategoryID";
        select.add(el);
    for(var i = 0; i < objCategory.length; i++) {
        var el = document.createElement("option");
        el.text = objCategory[i].Category_Name;
        el.value = objCategory[i].CategoryID;
        select.add(el);
        }
    }

function GetAjaxCategory() {
    //alert("H102");
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

////// Get Category Combo /////


////// Get Cart ID /////

function GetGenInfo(ProcName,SQL1,SQL2)
{
    this.ProcName = ProcName;
    this.SQL1 = SQL1;
    this.SQL2 = SQL2;
}

let stCartID
function AjaxGetCartID() {
    if (parent.GetPCartID())
    {
        stCartID = parent.GetPCartID();
        $("#txtCartID").val(stCartID);
        return;
    }
    //"SELECT JSON_ARRAYAGG(JSON_OBJECT('customer_id', customer_id,'Name_of_the_customer', Name_of_the_customer,'Delivery_Address', Delivery_Address,'Email_Address',Email_Address,'password', password,'Phone_number', Phone_number,'AdminID', AdminID)) FROM Customers where Email_Address='" + $("#txtEmail").val() + "'and password='" + $("#txtPWD").val() + "'"

    var obj = new GetGenInfo("Exec2SQL","insert into cartid () values()","Select JSON_ARRAYAGG(JSON_OBJECT('CartID',(select max(cartid) cartid from cartid))) cartid");
    console.log(obj)
    //alert(JSON.stringify(obj));
    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response[0];
            console.log("h55",response[0].CartID);
            stCartID=response[0].CartID;
            $("#txtCartID").val(stCartID);
            parent.SetPCartID(stCartID);
            //showUserLoginResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            //alert("UserID or Password not correct. Please check.");
        }
    });
}


////// End Get Cart ID /////


////// Get Items /////
let stItems;
let datetime;
let FnData;
function ItemsComboDy(dfVal){
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

function ItemsCombo(ItemsList){
    var select = document.getElementById(ItemsList); 
    select.innerHTML = "";
    for(var i = 0; i < stItems.length; i++) {
        var el = document.createElement("option");
        el.text = stItems[i].Name_of_the_item;
        el.value = stItems[i].ProductID;
        select.add(el);
        }
    }

function GetGenInfo(ProcName,SQL1,SQL2)
{
    this.ProcName = ProcName;
    this.SQL1 = SQL1;
    this.SQL2 = SQL2;
}


function AjaxGetItems() {
    //alert(document.getElementById('txtCategoryID').value);
    stItems="";
    //"SELECT JSON_ARRAYAGG(JSON_OBJECT('customer_id', customer_id,'Name_of_the_customer', Name_of_the_customer,'Delivery_Address', Delivery_Address,'Email_Address',Email_Address,'password', password,'Phone_number', Phone_number,'AdminID', AdminID)) FROM Customers where Email_Address='" + $("#txtEmail").val() + "'and password='" + $("#txtPWD").val() + "'"

    var obj = new GetGenInfo("Exec2SQL","delete from log1 where 1=2","Select JSON_ARRAYAGG(JSON_OBJECT('ProductID',ProductID,'Name_of_the_item',Name_of_the_item,'Availability',Availability,'Description',Description,'Price',Price,'CategoryID',CategoryID,'AdminID',AdminID)) from item Where CategoryID="+ $("#txtCategoryID").val());

    //alert(JSON.stringify(obj));
    // + document.getElementById('txtCategoryID')).value

    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            console.log("h55",response);
            stItems=response;
            //ItemsCombo("txtItemID");
            Getdata(stItems);
            //$("#txtCartID").val(stCartID);
            //showUserLoginResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            //alert("UserID or Password not correct. Please check.");
        }
    });
}


////// End Get Items /////







function SelectedItemInfojs(ProductID,CartID,Name_of_the_item,Quantity,Price,OrderDate,Mode_of_payment,Trip_Status,CustomerID,PartnerID,VendorID,CategoryID)
{
    this.ProductID = ProductID;
    this.CartID = CartID;
    this.Name_of_the_item = Name_of_the_item;
    this.Quantity = Quantity;
    this.Price = Price;
    this.OrderDate =OrderDate;
    this.Mode_of_payment="Cash";
    this.Trip_Status = 0;
    this.CustomerID = CustomerID;
    this.PartnerID = 1;
    this.VendorID = 1;
    this.CategoryID = CategoryID;
    
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
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> ProductID </th><th>Name_of_the_item</th> <th>Availability</th> <th>Description</th><th>Price</th><th>CategoryID</th><th>AdminID</th><th>Buy Quantity</th><th>Add to Cart</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        //alert(FnData[indx].ProductID);
        vStr += "<tr><td><input type='text' id='" + "txtProductID" + FnData[indx].ProductID + "' value='"+ FnData[indx].ProductID + "'> </td>" +  
                "<td><input type='text' id='" + "txtName_of_the_item" + FnData[indx].ProductID + "' value='"+ FnData[indx].Name_of_the_item + "'></td>" + 
                "<td><input type='text' id='" + "txtAvailability" + FnData[indx].ProductID + "' value='"+ FnData[indx].Availability + "'></td>" + 
                "<td><input type='text' id='" + "txtDescription" + FnData[indx].ProductID + "' value='"+ FnData[indx].Description + "'></td>" +
                "<td><input type='text' id='" + "txtPrice" + FnData[indx].ProductID + "' value='"+ FnData[indx].Price + "'></td>" +
                "<td><select id='" + "txtCategoryID" + FnData[indx].ProductID + "'>" + ComboDy(FnData[indx].CategoryID) + "</select></td>" +
                "<td><input type='text' id='" + "txtAdminID" + FnData[indx].ProductID + "' value='"+ FnData[indx].AdminID + "'></td>" + 
                "<td><input type='number' id='" + "txtQuantity" + FnData[indx].ProductID + "' value='0'></td>" +
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='AjaxAddItemstoCart(" + JSON.stringify(FnData[indx]) + ")' value='Add to Cart' /></td></tr>";
    }
    vStr = vStr + "</table>";
    //console.log("Hfinal",vStr)
    document.getElementById("Div1").innerHTML = vStr;
}

function forOnload(){
    var ResData = parent.GetUserParentValue();
    if (ResData){
    $("#txtCustomerID").val(ResData.customer_id);
    }
    UpdateURL();
    AjaxGetCartID();
    GetAjaxCategory();
    CategoryCombo(1, "txtCategoryID");
    AjaxGetItems();

    GetAjaxAllData();

}


function AjaxAddItemstoCart(objItem) {
    var stValues = stCartID + "," + objItem.ProductID + "," + $("#txtQuantity" + objItem.ProductID ).val() + "," +  objItem.Price + ",NOW(),'cash',0," + $("#txtCustomerID").val() + ",1,1," + objItem.CategoryID;

    var obj = new GetGenInfo("Exec2SQL","INSERT INTO shoppingcart (`CartID`,`ItemID`,`Quantity`,`price`,`OrderDate`,`Mode_of_payment`,`Trip_Status`,`CustomerID`,`PartnerID`,`VendorID`,`CategoryID`) VALUES (" + stValues + ")","Select JSON_ARRAYAGG(JSON_OBJECT('ProductID',ProductID,'Name_of_the_item',Name_of_the_item,'Availability',Availability,'Description',Description,'Price',Price,'CategoryID',CategoryID,'AdminID',AdminID)) from item");

    //alert(JSON.stringify(obj));
    // + document.getElementById('txtCategoryID')).value

    $.ajax({
        type: "POST",
        url: BaseURL + "/ProjectDb/v2/GenCmd",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            ResObj=response;
            //console.log("h55",ResObj);
            //stItems=response;
            //ItemsCombo("txtItemID");
            //Getdata(stItems);
            //$("#txtCartID").val(stCartID);
            //showUserLoginResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            //alert("UserID or Password not correct. Please check.");
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


