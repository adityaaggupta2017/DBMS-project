let x=1;
let y=7;
let z=y+2;
let k=2;
//BaseURL = "http://localhost:91"
//BaseURL = "http://127.0.0.1:8000"
//BaseURL = "https://calcsidea.azurewebsites.net"
function OpenOrderMgmt(){
    window.location.href = "OrderMgmt.html";
}

function UserInfojs(CategoryID,Category_Name)
{
    this.CategoryID = CategoryID;
    this.Category_Name = Category_Name;
}

function Getdata(FnData) {
    var vlength = FnData.length;
    
    var vStr = "<table border=1 class='table table-striped'><thead><tr><th> OrderID </th><th>Total Items</th><th>Total Price</th></tr></thead>";
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td><input type='text' id='" + "txtOrderID" + FnData[indx].OrderID + "' value='"+ FnData[indx].OrderID + "'> </td>" +  
                "<td><input type='text' id='" + "txtTotalItems" + FnData[indx].OrderID + "' value='"+ FnData[indx].TotalItems + "'></td>" + 
                "<td><input type='text' id='" + "txtTotalPrice" + FnData[indx].OrderID + "' value='"+ FnData[indx].TotalPrice + "'></td>" +
                "<td><input type='button' class='btn btn-success btn-rounded btn-fw' onclick='ShowOerderItems(" + FnData[indx].OrderID + ")' value='Show Details' /></td></tr><tr><td><div  id='CDiv" + FnData[indx].OrderID + " class='table-responsive'></div></td></tr>";

                

        //console.log(indx)
    }
    
   vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

}


function GetGenInfo(ProcName,SQL1,SQL2)
{
    this.ProcName = ProcName;
    this.SQL1 = SQL1;
    this.SQL2 = SQL2;
}

let stCustID
function AjaxAllOrders() {
    stCartID=2;
    if (parent.GetUserParentValue())
        {
            stCustID = parent.GetUserParentValue().customer_id;
            //$("#txtCartID").val(stCartID);
            //return;
        }
        //console(stCustID);
        //alert(stCustID);

    var obj = new GetGenInfo("Exec2SQL","delete from log1 where 1=2","Select JSON_ARRAYAGG(JSON_OBJECT('OrderID',OrderID,'TotalItems',TotalItems,'TotalPrice',TotalPrice)) from (Select OrderID,count(Quantity) TotalItems,Sum(price) TotalPrice from `order` where CustomerID=" + stCustID +" group by OrderID) tt1");
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
           // Getdata(mstfilter);
            

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


