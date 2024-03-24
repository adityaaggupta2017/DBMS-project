function fnOrderdtl(){
    window.location.href = "OrderMgmt.html";
}

function UserInfojs(Name_of_the_customer,Delivery_Address,Email_Address,password,Phone_number)
{
    this.Name_of_the_customer = Name_of_the_customer;
    this.Delivery_Address = Delivery_Address;
    this.Email_Address = Email_Address;
    this.password = password;
    this.Phone_number = Phone_number;
    this.AdminID = 1;

}

function GetGenInfo(ProcName,SQL2)
{
    this.ProcName = ProcName;
    this.SQL2 = SQL2;
}

function RemoveUserDetails(){
    parent.RemoveParentValue();
    window.location.href = "Index1.html";
}

function showUserLoginResData(ResData){
    //$("#txtEmail").val(ResData.Email_Address);
    //$("#txtPWD").val(ResData.password);
    parent.showUserLoginData(ResData); // = $("#Slno").val();
    //alert("Login Successfully!");
    window.location.href = "OrderMgmt.html";
   
}

function AjaxUserLogin() {
    UpdateURL();
    UpdateURL();
    var obj = new GetGenInfo("ValidateAdmin","SELECT JSON_ARRAYAGG(JSON_OBJECT('customer_id', customer_id,'Name_of_the_customer', Name_of_the_customer,'Delivery_Address', Delivery_Address,'Email_Address',Email_Address,'password', password,'Phone_number', Phone_number,'AdminID', AdminID)) FROM Customers where Email_Address='" + $("#txtEmail").val() + "'and password='" + $("#txtPWD").val() + "'");
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
            console.log("h55",response[0]);
            showUserLoginResData(ResObj);
        },
        error: function (err) {
            console.log(err);
            alert("UserID or Password not correct. Please check.");
        }
    });
}

