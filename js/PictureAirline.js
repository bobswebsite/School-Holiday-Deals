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
    document.getElementById("notif").style.display='none';
    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
   
}
let base64String = "";
  
function imageUploaded() {
    var file = document.querySelector(
        'input[type=file]')['files'][0];
  
    var reader = new FileReader();
   
      
    reader.onload = function () {
        base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
  
        imageBase64Stringsep = base64String;
  
        // alert(imageBase64Stringsep);
        document.getElementById("imag").value=(base64String='data:image/png;base64,'+base64String);
    }
    reader.readAsDataURL(file);
}

var Airline=document.getElementById("SAirline");
if(Airline){
    Airline.addEventListener("keyup",dusplayAirline);
}


async function dusplayAirline(){

    var AirlineArry=[];
        const data={Airline:Airline.value}
        AirlineArry= await get10Airline(data);
    var tblAir=document.getElementById("myUL_F");
    tblAir.innerHTML=``;
    for(var i=0;i<AirlineArry.length;i++)
    {
        if(Airline.value!="" && AirlineArry[i].photo==null)
        {
            var rows=` <li onclick="getdata('${AirlineArry[i].Airline}','${AirlineArry[i].Aircode}','${AirlineArry[i].photo}')"> <center><a href="#" style="color: #287dfa;">${AirlineArry[i].Airline}</a></center></li>`;
            tblAir.innerHTML+=rows;
        }
      
    }
    
}

function getdata(AIRLINE,AIRCODE,PICTURE)
{
    document.getElementById("SAirline").value=AIRLINE;
    document.getElementById("Airline").value=AIRLINE;
    document.getElementById("Aircod").value=AIRCODE;
    document.getElementById("imag").value=(PICTURE!='null')?PICTURE:'';
    document.getElementById("myUL_F").innerHTML=``;
}


var send=document.getElementById("Confirm");
if(send){
    send.addEventListener("click",SendUpdt);
}



async function SendUpdt(){
    
    var picture=document.getElementById("imag");
    var air=document.getElementById("Airline");
    var airde=document.getElementById("Aircod");
    if(air.value!='' && picture.value!='' && airde.value!='')
    {
       await UpdtAirImg({Airline:air.value,Aircode:airde.value,photo:picture.value}).then(response=>{
           if(response.ok){
            document.getElementById("notif").style.display='inline-block';
            geet();
            document.getElementById("SAirline").value='';
            airde.value=''; picture.value='';air.value='';
           }
       });
    }
   else{
       alert("There is an empty field");
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
async function get10Airline(data) {
    const response=await fetch(`${URL}get10Airline`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function UpdtAirImg(data) {
    const response=await fetch(`${URL}updtAirimg`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}