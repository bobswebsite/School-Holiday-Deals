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
  var divase;

    const ua = navigator.userAgent;
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        divase= "mobile";
    }else{
        divase= "desktop";
    }

document.getElementById("Load").onload =home;


var arrylist=[],arrylist8=[];

async function home(){
    document.getElementById("selectNights").style.display='none';
    
    (localStorage.getItem("idUser")!=null)?document.getElementById("login1").style.display='none':document.getElementById("login1").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login2").style.display='none':document.getElementById("login2").style.display='inline-block';
    document.getElementById("Sign_Out").style.display='none';
    if(localStorage.getItem("idUser")!=null){document.getElementById("Sign_Out").style.display='inline-block';}
    if(localStorage.getItem("admin")==null)localStorage.setItem("admin",false);
    var dash=document.getElementsByClassName("dashboard1");
    dash[0].style.display='none';
    dash[1].style.display='none';
    if(localStorage.getItem("admin")=="false"){dash[0].style.display='inline-block';}
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';}
    (divase!='mobile')?await NUMVisitors({Status:false}):await NUMVisitors({Status:true});
     
    

arrylist=await Get6AirPort();

var l=document.getElementById("get6");

for(var i = 0; i < arrylist.length; i++)
{arrylist[i].Dates=arrylist[i].Dates.slice(0,10);
if(arrylist[i].To=="DXB")arrylist[i].To="Dubai";
else if(arrylist[i].To=="ADL")arrylist[i].To="Australia";
else if(arrylist[i].To=="CAI")arrylist[i].To="Egypt";
else if(arrylist[i].To=="MRU")arrylist[i].To="Mauritius";
else if(arrylist[i].To=="JFK")arrylist[i].To="New York";
else if(arrylist[i].To=="IAD")arrylist[i].To="Washington";

    var row=` <div class="col-lg-4 responsive-column">
    <div class="card-item flight-card">
        <div class="card-img" >
            <a href="#" onclick='openFlight(${i})' class="d-block">
                <img src="${arrylist[i].photos}" alt="destination-img" height=248>
                <span class="badge">${arrylist[i].To}</span>
            </a>
        </div>
        <div class="card-body">
            <h4 style="color:#40cc6f;">${arrylist[i].Airline} </h4>
            <h3 class="card-title"><a href="#" onclick='openFlight(${i})'>${arrylist[i].From} to ${arrylist[i].To}</a></h3>
            <p class="card-meta">One way Flight</p>
            <div class="card-price d-flex align-items-center justify-content-between">
                <p>
                    <span class="price__from">From</span>
                    <span class="price__num">£${arrylist[i].Price}</span>
                </p>
                <a href="#" class="btn-text" onclick='openFlight(${i})'>Read details<i class="la la-angle-right"></i></a>
            </div>
        </div>
    </div><!-- end card-item -->
</div>`;
l.innerHTML+=row;
}



arrylist8= await Get8AirPort();
var lu=document.getElementById("get8");

for(var i = 0; i < arrylist8.length; i++)
{

if(arrylist8[i].To=="LAS")arrylist8[i].To="las vegas";
else if(arrylist8[i].To=="DXB")arrylist8[i].To="Dubai";
else if(arrylist8[i].To=="JFK")arrylist8[i].To="New York";
else if(arrylist8[i].To=="ADL")arrylist8[i].To="Australia";
else if(arrylist8[i].To=="AKL")arrylist8[i].To="New Zealand";
else if(arrylist8[i].To=="ANU")arrylist8[i].To="Caribbean";
else if(arrylist8[i].To=="ATL")arrylist8[i].To="Atlanta";
else if(arrylist8[i].To=="ATQ")arrylist8[i].To="India";

    var row=` <div class="col-lg-3 responsive-column">
    <div class="deal-list">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="title"><a href="#">${arrylist8[i].To}</a></h5>
            <span class="font-weight-bold font-size-18">£${arrylist8[i].Price}.00</span>
        </div>
        <a href="#" class="theme-btn theme-btn-small" onclick='openSky(${i})'>More</a>
    </div>
</div>`;
lu.innerHTML+=row;
}

}


    

async function openSky(i)
{
    document.getElementById("preloader").style.display='inline-block';
   
    const data={To:arrylist8[i].To,Price:arrylist8[i].Price}
    await FlightSky(data).then(response=>{
        localStorage.removeItem("Skay");
        localStorage.setItem("Skay",JSON.stringify(response));
        localStorage.removeItem("ToS");
        localStorage.setItem("ToS",arrylist8[i].To);
        window.open('flight-grid');
    }).catch(e=>{});
    document.getElementById("preloader").style.display='none';
}

async function openFlight(i)
{
    document.getElementById("preloader").style.display='inline-block';
   
    const data={From:arrylist[i].From,To:arrylist[i].To,Dates:""+arrylist[i].Dates+"",Airline:arrylist[i].Airline}
    
    await FuFlight(data).then(response=>{
        response[0]["Dates"]=response[0]["Dates"].slice(0,10);
        localStorage.removeItem("data");
        localStorage.setItem("data",JSON.stringify(response[0]));
        window.open('flight-booking');
    }).catch(e=>{});

    document.getElementById("preloader").style.display='none';
}

var city=document.getElementById("sFrom");
if(city){
    city.addEventListener("keyup",dusplayCity);
   
    
}
var city2=document.getElementById("sTo");
if(city2){
    city2.addEventListener("keyup",dusplayCity2); 
}

     async function dusplayCity(){

        var cityArry=[];
            const data={city:city.value}
            cityArry= await get5city(data);
        var tblCity=document.getElementById("myUL_F");
            tblCity.innerHTML=``;
        for(var i=0;i<cityArry.length;i++)
        {
            if(city.value!="")
            {
                var rows=` <li onclick="getdata(0,'${cityArry[i].city}')"> <center><a href="#" style="color: #287dfa;">${cityArry[i].city}</a></center></li>`;
                tblCity.innerHTML+=rows;
            }
          
        }
        
        }
        
        
       async function dusplayCity2(){
        
            var cityArry=[];
                const data={city:city2.value}
                cityArry= await get5city(data);
            var tblCity=document.getElementById("myUL_T");
                tblCity.innerHTML=``;
            for(var i=0;i<cityArry.length;i++)
            {
                if(city2.value!="")
                {
                    var rows=` <li href="#" onclick="getdata(1,'${cityArry[i].city}')"> <center><a  href="#" style="color: #287dfa;">${cityArry[i].city}</a></center></li>`;
                    tblCity.innerHTML+=rows;
                }
              
            }
            
         }





 function getdata(ident,txt)
{
    if(ident==0 && txt!="")
    {
    document.getElementById("sFrom").value=txt;
    document.getElementById("myUL_F").innerHTML=``;
    }
    if(ident==1 && txt!="")
    {
    document.getElementById("sTo").value=txt;
    document.getElementById("myUL_T").innerHTML=``;
    }
}



    var sear1=document.getElementById("search1");
    if(sear1){
        sear1.addEventListener("click",Funsearch);
    }

    
    var hdr2=document.getElementById("header2");
    if(hdr2){
        hdr2.addEventListener("click",Funheader);
    }
var test=false;
    var fe=document.getElementById("fromDate");
  if(fe){fe.addEventListener("click",bbb)}

  function bbb(){test=true;console.log(test);}
   async function Funsearch(){
      
       var From,To,cabin,Airline,Days,FromDate,ToDate,dte;
       From=document.getElementById("sFrom").value;
       To=document.getElementById("sTo").value;
       cabin=document.getElementById("cabin").value;
       (typeHD)?Days=document.getElementById("Nught").value:Days=document.getElementById("Days").value;
       var e=document.getElementById("Airline");
       Airline=e.options[e.selectedIndex].text;
       if(test=true){
        dte=document.getElementById("fromDate").value;
        FromDate=dte.slice(0,10);
        FromDate=formatDate(FromDate)
        ToDate=dte.slice(12,23);
        ToDate=ToDate.trim();
        ToDate=formatDate(ToDate);
       }
       else{
        FromDate="1997-01-01"
        ToDate="1997-01-01"
       }
      

     localStorage.removeItem("From");
     localStorage.setItem("From",From);
     localStorage.removeItem("To");
     localStorage.setItem("To",To);
     
     localStorage.removeItem("cabin");
     localStorage.setItem("cabin",cabin);
     localStorage.removeItem("Days");
     localStorage.setItem("Days",Days);
     localStorage.removeItem("Airline");
     localStorage.setItem("Airline",Airline);

     localStorage.removeItem("FromDate");
     localStorage.setItem("FromDate",FromDate);
     localStorage.removeItem("ToDate");
     localStorage.setItem("ToDate",ToDate);
     
     localStorage.removeItem("Status");
     localStorage.setItem("Status",1);
     window.location="flight-sidebar";

   }

   function Funheader(){
    localStorage.removeItem("Status");
    localStorage.setItem("Status",0);
    window.location="flight-sidebar";
   }

function formatDate(date)
{
    const myArray =date.split("/");
    return [myArray[2],myArray[1],myArray[0]].join('-');
}






var signup=document.getElementById("btnS");
if(signup){
    signup.addEventListener("click",FuSignup);
}

async function FuSignup(){
    signup.disabled=true;
    var vr=document.getElementsByClassName("form-control S");

    
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const dataD={full_name:vr[0].value,phone_number:vr[2].value,email:vr[1].value,password:vr[3].value,dateCreate:''+utc+''};

(vr[3].value==vr[4].value)?await Signup(dataD).then(response=>{
(response[0]["Status"]==true)?after(response[0]):FuClear(vr,true);
}):alert("password does not match");
}

var login=document.getElementById("btnL");
if(login){
    login.addEventListener("click",FuLogIn);
}

async function FuLogIn(){
    var vr=document.getElementsByClassName("form-control l");
    login.disabled=true;
const dataD={email:vr[0].value,password:vr[1].value}
await Login(dataD).then(response=>{console.log(response[0]["Status"]);
(response[0]["Status"]==true)?after(response[0]):FuClear(vr,false);
});
}
function after(id){
  
        localStorage.removeItem("idUser");
        localStorage.setItem("idUser",id["id"]);
        localStorage.removeItem("enabled");
        localStorage.setItem("enabled",id["enabled"]);
        localStorage.removeItem("full_name");
        localStorage.setItem("full_name",id["full_name"]);
        localStorage.removeItem("phone_number");
        localStorage.setItem("phone_number",id["phone_number"]);
        localStorage.removeItem("admin");
        localStorage.setItem("admin",id["admin"]);
        localStorage.removeItem("email");
        localStorage.setItem("email",id["email"]);
        localStorage.removeItem("dateCreate");
        localStorage.setItem("dateCreate",id["dateCreate"]);
        location.reload();
    

}

function FuClear(vr,st){
    if(st===false){
        vr[0].value='';
        vr[1].value='';
        document.getElementsByClassName("Error$")[0].innerHTML=`Incorrect password or email`;
        login.disabled=false;
    }
    else{
        vr[1].value='';
        vr[2].value='';
        document.getElementsByClassName("Error")[0].innerHTML=`Email or phone number already exists`;
        signup.disabled=false;
    }
    
}


var t=document.getElementsByClassName("form-control l");
if(t[0]){
    t[0].addEventListener("keyup",myFunction);
}
var tx=document.getElementsByClassName("form-control S");
if(tx[0]){
    tx[0].addEventListener("keyup",myFunctionS);
}
function myFunction() {
  var x = document.getElementsByClassName("Error$");
  x[0].innerHTML=``;
}
function myFunctionS() {
    var x = document.getElementsByClassName("Error");
    x[0].innerHTML=``;
  }




  var chk=document.getElementById("check1");
  if(chk){
      chk.addEventListener("change",()=>{document.getElementById("fromDate").disabled=!document.getElementById("fromDate").disabled;});
  }


var typeHD=false;

  var vrday=document.getElementById("round-trip-tab");
  if(vrday){
      vrday.addEventListener("click",functiondays)
  }

var vrholiday=document.getElementById("holiday");
if(vrholiday){
    vrholiday.addEventListener("click",functionHolidy)
}


function functionHolidy(){
    document.getElementById("selectDays").style.display='none';
    document.getElementById("selectNights").style.display='inline-block';
    typeHD=true;
}
function functiondays(){
    document.getElementById("selectDays").style.display='inline-block';
    document.getElementById("selectNights").style.display='none';
    typeHD=false;
}


var URL='https://s-hd.herokuapp.com/';

async function FuFlight(data) {
    const response=await fetch(`${URL}GetFlight`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function FlightSky(data) {
    const response=await fetch(`${URL}GetFlightSky`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function Get6AirPort() {
    var output
        await $.get(""+URL+"GetItems", await function (data) {
            output = data
        });
        return output;
}
async function Get8AirPort() {
    var output
        await $.get(""+URL+"Get8Items", await function (data) {
            output = data
        });
        return output;
}

async function get5city(data) {
    const response=await fetch(`${URL}getCity`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function Signup(data) {
    const response=await fetch(`${URL}SignUp`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function Login(data) {
    const response=await fetch(`${URL}LogIn`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function NUMVisitors(data) {
    const response=await fetch(`${URL}addVisitors`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

