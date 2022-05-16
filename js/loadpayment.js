
document.getElementById("Load").onload=dashLoad;
let codeID;
async function dashLoad(){

    document.getElementById("preloader").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login1").style.display='none':document.getElementById("login1").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login2").style.display='none':document.getElementById("login2").style.display='inline-block';
    document.getElementById("Sign_Out").style.display='none';
    if(localStorage.getItem("idUser")!=null){document.getElementById("Sign_Out").style.display='inline-block';}
    if(localStorage.getItem("admin")==null)localStorage.setItem("admin",false);
    var dash=document.getElementsByClassName("dashboard1");
    dash[0].style.display='none';
    dash[1].style.display='none';
    if(localStorage.getItem("admin")=="false"){dash[0].style.display='inline-block';}
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';};
    var date = new Date(); // Now
    document.getElementById("dateS").innerHTML=`<span>Check-in:</span >${date.toDateString()}`;
    date.setDate(date.getDate() + 30);
    document.getElementById("dateE").innerHTML=`<span>Check-out:</span> ${date.toDateString()}`;
    document.getElementById("fullname").innerHTML=`<span>Username:</span> ${localStorage.getItem("full_name")}`;
    
    const list=await GetPlan(); 
    codeID=list[1].Price;
    document.getElementById("dollar").innerHTML=`<span>Price:</span>$ ${codeID}`;
}























var URL='http://localhost:4200/';
async function GetPlan() {
    var output
        await $.get(""+URL+"GetPlanVip", await function (data) {
            output = data
        });
        return output;
}