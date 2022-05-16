document.onkeydown = function(e) {
    if(event.keyCode == 123) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
       return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
       return false;
    }
  }
document.getElementsByClassName("section-bg")[0].onload=dashLoad;

async function dashLoad(){

    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    document.getElementById("notif").style.display='none';
}

var city=document.getElementById("Scity");
if(city){
    city.addEventListener("keyup",dusplayCity);
}
async function dusplayCity(){

    var cityArry=[];
        const data={city:city.value}
        cityArry= await get10city(data);
    var tblCity=document.getElementById("myUL_F");
        tblCity.innerHTML=``;
    for(var i=0;i<cityArry.length;i++)
    {
        if(city.value!="" && cityArry[i].photos==null)
        {
            var rows=` <li onclick="getdata('${cityArry[i].city}','${cityArry[i].code}','${cityArry[i].photos}')"> <center><a href="#" style="color: #287dfa;">${cityArry[i].city}</a></center></li>`;
            tblCity.innerHTML+=rows;
        }
      
    }
    
}
function getdata(CITY,CODE,PICTURE)
{
    document.getElementById("Scity").value=CITY;
    document.getElementById("city").value=CITY;
    document.getElementById("airport").value=CODE;
    document.getElementById("imag").value=(PICTURE!='null')?PICTURE:'';
    document.getElementById("myUL_F").innerHTML=``;
}

var send=document.getElementById("Confirm");
if(send){
    send.addEventListener("click",SendUpdt);
}

async function SendUpdt(){
    
    var picture=document.getElementById("imag");
    var ville=document.getElementById("city");
    if(city.value==ville.value && picture.value!='')
    {
       await UpdateCity({city:ville.value,picture:picture.value}).then(response=>{
           if(response.ok){
            document.getElementById("notif").style.display='inline-block';
            geet();
            document.getElementById("airport").value='';
            ville.value=''; picture.value='';city.value='';
           }
       });
    }
   
    
            
}
async function geet(){setTimeout( function() {document.getElementById("notif").style.display='none'},1500);};
var URL='https://s-hd.herokuapp.com/';

async function TestId(data) {
    const response=await fetch(`${URL}TestIdUser`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function get10city(data) {
    const response=await fetch(`${URL}get10City`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function UpdateCity(data) {
    const response=await fetch(`${URL}updateCity`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}
