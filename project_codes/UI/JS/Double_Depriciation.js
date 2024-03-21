//import * as echarts from '../HTML/assets/vendor/echarts/echarts';

let x=1;
let y=7;
let Tint=0;
let TPrin=0;
let GraphData;
let GraphLayout;

//BaseURL = "http://localhost:91"
//BaseURL = "http://127.0.0.1:8000";

function CheckNumber(x,y)
{
    var x1="";
    var y1="";
    x1=x;
    y1=y;
    //alert($("#" + x1).val());
    if ($("#" + x1).val() <= 0)
        {
            alert($("#" + x1).val() + " This is not correct value, should be > 0");
            console.log($("#" + x1).val());
            $("#" + x1).val(y1);
        }

}

function CompareValues(x,y)
{
    var x1="";
    var y1="";
    x1=x;
    y1=y;
    //alert($("#" + x1).val());
    if ($("#" + x1).val() <= $("#" + y1).val())
        {
            alert($("#" + x1).val() + " This should be > " + $("#" + y1).val());
            //console.log($("#" + x1).val());
            $("#" + x1).val($("#" + y1).val() + 1);
        }

}

function GenericMasterjs(EMINO,EMI,Int,Prin,fv,pv)
{
    this.EMINO = EMINO;
    this.EMI = EMI;
    this.Int = Int;
    this.Prin = Prin;
    this.fv = fv;
    this.pv = pv;
}

function GetTotalValues(Obj) {
    Tint=0;
    TPrin=0;
    for (indx = 0; indx < Obj.length; indx++) {
            Tint=Tint + parseFloat(Obj[indx].Int);
            TPrin=TPrin + parseFloat(Obj[indx].Prin);
            $("#Tint").val(Tint.toFixed(2));
            $("#TPay").val((TPrin + Tint).toFixed(2));
        }
    }

function LoanCriteria(Amount,Tenure,Rate)
{
    this.Amount = Amount;
    this.Tenure = Tenure;
    this.Rate = Rate;
}

function DepositCriteria(Amount,Tenure,Rate,RepeatMonth)
{
    this.Amount = Amount;
    this.Tenure = Tenure;
    this.Rate = Rate;
    this.RepeatMonth = RepeatMonth;
}

function DepreciationCriteria(cost , salvage_value , useful_life , total_years)
{
    this.cost = cost;
    this.salvage_value = salvage_value;
    this.useful_life = useful_life;
    this.total_years = total_years;
}



function Getdata(FnData) {
    var vlength = FnData.length;
    
    //var vStr = "<table border=1 class='table table-bordered border-primary'><tr><td> EMINO </td><td>EMI</td> <td>Int</td> <td>Prin</td><td>FV</td><td>PV</td></tr>";
    var vStr = "<table border=1 class='table table-bordered border-primary'><tr class='headerTable'><td> Year </td><td>Cost</td> <td>Depriciation</td> <td>Cumulative Depriciation</td></tr>";
    //.datatable
    for (indx = 0; indx < vlength; indx++)
    {
        vStr += "<tr><td>" + FnData[indx].Year + "</td>" +  
                "<td>" + FnData[indx].Cost + " </td>" + 
                "<td>" + FnData[indx].Depriciation + " </td>" + 
                "<td>" + FnData[indx].Cumulative_Depriciation + " </td>"; 
        //console.log(indx)
        
    }
    
    vStr = vStr + "</table>";
    document.getElementById("Div1").innerHTML = vStr;

    GetAjaxDepositChart() ;
        
}



function GetAjaxAllData2() {
    console.log("h0",x,y)
    //LoanCriteria(Amount,Tenure,Rate)
    var obj = new DepreciationCriteria($("#tb_Cost").val(), $("#tb_Salvage").val(), $("#tb_Life").val(), $("#tb_Years").val());

    if (parseFloat(obj.cost) < parseFloat(obj.salvage_value)){
        alert("Cost should be greater than Salvage value");
        return ;
    }
    
    if (parseInt(obj.useful_life) <= 0){
        alert("Useful life should be greater than 0");
        return ;
    }
    // alert(JSON.stringify(obj));

    $.ajax({
        type: "POST",
        url: BaseURL + "/RePaySchedule/v2/GetDouble_declining",
        contentType: "application/json",
        datatype: "json",
        async: false,
        data: JSON.stringify(obj),
        //'{"m":4,"n":6}',
        //data: '{"m":' + x  + ',"n":' + y + '}',
        success: function (response) {
            
            //mstfilter = response;
            mstfilter5 = response;  
            // alert(mstfilter5);
            
            $("#tb_EMI").val(mstfilter5[0]["Cost"]);
            $("#Tint").val(mstfilter5[mstfilter5.length - 1]["Cumulative_Depriciation"]);
            
            var val1 = parseFloat(mstfilter5[mstfilter5.length - 1]["Cumulative_Depriciation"]);
            var val2 = parseFloat(mstfilter5[0]["Cost"]);
            var val3 = val2 - val1; 
            val3 = val3.toFixed(2);
  
            $("#TPay").val(val3);
            //GetTotalValues(mstfilter5);
            Getdata(mstfilter5);
            
        },
        error: function (err) {
            // alert(err)
            console.log(err);
        }
        
    });
     
}

function GetAjaxDepositChart() {
    var obj = new DepreciationCriteria($("#tb_Cost").val(), $("#tb_Salvage").val(), $("#tb_Life").val() , $("#tb_Years").val());
    $.ajax({
        type: "POST",
        //url: BaseURL + "/api1/v1/GenricMaster/",
        url:"http://127.0.0.1:8000/RePaySchedule/v2/GetDouble_decliningChart",
        contentType: "application/json",
        async: false,
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            //alert("hold");
            //mstfilter = response;
            mstfilter = response;
            //console.log(response);
            GetChartdata(mstfilter);
            
 
        },
        error: function (err) {

            console.log(err);
        }
    });
}

function GetChartdata(FnData) {

    GraphData = FnData.data;
    GraphLayout=FnData.layout;
    //console.log("H7",GraphData);
    //console.log("H8",GraphLayout);
    GetPolyGraph();
}

function GetPolyGraph(){
    //alert(GraphData)
    window.PLOTLYENV=window.PLOTLYENV || {};                                    
    if (document.getElementById("plgh1")) 
    {Plotly.newPlot("plgh1",GraphData,GraphLayout)};

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


function AjaxInsertdata() {
    var obj = new GenericMasterjs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());
    
    $.ajax({
        type: "POST",
        url: BaseURL + "/api1/v1/GenricMaster/",
        contentType: "application/json",
        datatype: "json",
        data: "[" + JSON.stringify(obj) +"]",
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            GetAjaxAllData2();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function AjaxDeletedata(ID) {
    //var obj = new GenericMasterjs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());
    $.ajax({
        type: "DELETE",
        url: BaseURL + "/api1/v1/GenricMaster/" + ID + "/",
        contentType: "application/json",
        datatype: "json",
        //data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            //Getdata(Genmst);
            GetAjaxAllData2();
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function AjaxUpdatedata(ID) {
    st1='#txtGenKeyID_' + ID
    console.log(st1)
    console.log($(st1).val())
    console.log($('#txtGenKeyDesc_' + ID).val())
    console.log($('#txtGenKeyType_' + ID).val())

    var obj = new GenericMasterjs(ID, $('#txtGenKeyID_' + ID).val(), $('#txtGenKeyDesc_' + ID).val(), $('#txtGenKeyType_' + ID).val());
    console.log("1111111111111111111111");
    console.log(JSON.stringify(obj));
    console.log("11111111111111111111111111");
   
    $.ajax({
        type: "PUT",
        url: BaseURL + "/api1/v1/GenricMaster/" + ID + "/",
        contentType: "application/json",
        datatype: "json",
        data: JSON.stringify(obj),
        success: function (response) {
            Genmst=[response];
            console.log(Genmst);
            //Getdata(Genmst);
            GetAjaxAllData2();
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

function GenericMasterjs(Slno,GenKeyID,GenKeyDesc,GenKeyType)
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

    var obj = new GenericMasterjs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

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


    var obj = new GenericMasterjs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

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


    var obj = new GenericMasterjs($("#tb_Slno").val(), $("#tb_GenKeyID").val(), $("#tb_GenKeyDesc").val(), $("#tb_GenKeyType").val());

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