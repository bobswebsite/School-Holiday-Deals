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
document.getElementById("Load").onload =homeSearch;
var  arrySearch1=[], arryAirline=[],arryDays=[],arryCabin=[],arryStop=[],resulte=[],resulteDay=[],resulteCabin=[],resulteStop=[]

var nbrPage=0;
var tpage;
var l=document.getElementById("res1");

async function homeSearch(){

    document.getElementById("Sign_Out").style.display='none';
    if(localStorage.getItem("idUser")!=null){document.getElementById("Sign_Out").style.display='inline-block';}
    var dash=document.getElementsByClassName("dashboard1");
    dash[0].style.display='none';
    dash[1].style.display='none';
    if(localStorage.getItem("admin")=="false"){dash[0].style.display='inline-block';}
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';}
    (localStorage.getItem("idUser")!=null)?document.getElementById("login1").style.display='none':document.getElementById("login1").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login2").style.display='none':document.getElementById("login2").style.display='inline-block';

    if(localStorage.getItem("Status")==1){
        
    const data={IDuser:(localStorage.getItem("idUser")!=null)?localStorage.getItem("idUser"):0,From:localStorage.getItem("From"),To:localStorage.getItem("To"),cabin:localStorage.getItem("cabin"),Airline:localStorage.getItem("Airline"),Days:localStorage.getItem("Days"),fromDate:localStorage.getItem("FromDate"),toDate:localStorage.getItem("ToDate")}
        arrySearch1=await Search1(data);
        document.getElementById("found").innerHTML=`<h3 class="title font-size-24" >${arrySearch1.length} Flights found</h3>`;
        if(arrySearch1.length>0) document.getElementById("circleLoad").style.display = "none";

        l.innerHTML=``;

        nbrPage=20;
        _i=0;
       arryAirline=[... new Set(arrySearch1.map(data => data.Airline))];
      var air="";
       for(var i=0;i<arryAirline.length;i++){
        air=arryAirline[i];
           (air!=null)?air=arryAirline[i]:air="Unknown";
            var r=`<div class="custom-checkbox" checked>
            <input type="checkbox" id="catChb${i}" onclick="clickChek('catChb${i}','${i}')">
            <label for="catChb${i}">${air}</label>
            </div>`;
            document.getElementById("addairline").innerHTML+=r;
           
        }
      
        arryDays=[... new Set(arrySearch1.map(data => data.Days))];
        var days="";
        for(var i=0;i<arryDays.length;i++){
            days=arryDays[i];
               (days!=null)?days=arryDays[i]:days="Unknown";
                var r=`<div class="custom-checkbox" checked>
                <input type="checkbox" id="atChb${i}" onclick="clickChekD('atChb${i}','${i}')">
                <label for="atChb${i}">${days}</label>
                </div>`;
                document.getElementById("addDays").innerHTML+=r;
               
            }


            arryCabin=[... new Set(arrySearch1.map(data => data.Cabin))];
            
            var cabin="";
            for(var i=0;i<arryCabin.length;i++){
                cabin=arryCabin[i];
                   (cabin!=null)?cabin=arryCabin[i]:cabin="Unknown";
                    var r=`<div class="custom-checkbox" checked>
                    <input type="checkbox" id="cabin${i}" onclick="clickChekC('cabin${i}','${i}')">
                    <label for="cabin${i}">${cabin}</label>
                    </div>`;
                    document.getElementById("addCabin").innerHTML+=r;
                   
                }

                arryStop=[... new Set(arrySearch1.map(data => data.Stops))];
                
                var Stop;
                for(var i=0;i<arryStop.length;i++){
                    Stop=arryStop[i];
                       (Stop!=null)?Stop=arryStop[i]:Stop="Unknown";
                        var r=` <div class="custom-checkbox">
                                <input type="checkbox" id="flightStop${i}" onchange="clickChekS('flightStop${i}','${i}')">
                                <label for="flightStop${i}">${Stop}</label>
                                </div>`;
                        document.getElementById("addStop").innerHTML+=r;
                       
                    }

                    (arrySearch1[0].Status==false)?l.innerHTML=`<div class="col-lg-3 responsive-column-l">
                    <div class="icon-box icon-layout-2 dashboard-icon-box dashboard--icon-box bg-3 pb-0">
                        <div class="d-flex pb-3 justify-content-between">
                            <div class="info-content">
                                <p class="info__desc">Activate advanced search</p>
                                <h4 class="info__title">VIP</h4>
                            </div><!-- end info-content -->
                            <div class="info-icon icon-element bg-white text-color-4">
                                <i class="la la-ship"></i>
                            </div><!-- end info-icon-->
                        </div>
                        <div class="section-block"></div>
                        <a href="pricing" class="d-flex align-items-center justify-content-between view-all">View Details<i class="la la-arrow-right"></i></a>
                    </div>
                </div>`:await diplayData(arrySearch1,0);
        
    }
    else
    {
        document.getElementById("found").innerHTML=`<h3 class="title font-size-24" >0 Flights found</h3>`;
        document.getElementById("circleLoad").style.display = "none";
    }
}



async function clickChek(ctchb,nbr){
    l.innerHTML=``;
    var checkBox = document.getElementById(ctchb);
    nbrPage=20;
   _i=0;
 if (checkBox.checked == true){
    
   
   
    

   
        var listId=(arrySearch1.filter(data => data.Airline == arryAirline[nbr]));
    
    
    for(var i=0;i<listId.length;i++){
        resulte.push(listId[i]);
    }
        await diplayData(resulte,0);
  } 
  else {
    
    var NewArray= resulte.filter((item) => item.Airline !== arryAirline[nbr])
    resulte=[];
    resulte=NewArray;
    await diplayData(resulte,0);
    if(resulte.length===0){window.location="flight-sidebar";}
  }
}

async function clickChekD(ctchb,nbr){
    l.innerHTML=``;
    var checkBox = document.getElementById(ctchb);
    nbrPage=20;
   _i=0;
 if (checkBox.checked == true){
    
   
    l.innerHTML=``;
    
 
        var listId=(arrySearch1.filter(data => data.Days == arryDays[nbr]));
    
    
    for(var i=0;i<listId.length;i++){
        resulteDay.push(listId[i]);
    }
        await diplayData(resulteDay,0);
  } 
  else {
    
    var NewArray= resulteDay.filter((item) => item.Days !== arryDays[nbr])
    resulteDay=[];
    resulteDay=NewArray;
    await diplayData(resulteDay,0);
    if(resulteDay.length===0){window.location="flight-sidebar";}
  }
}

async function clickChekC(ctchb,nbr){
    l.innerHTML=``;
    var checkBox = document.getElementById(ctchb);
    nbrPage=20;
   _i=0;
 if (checkBox.checked == true){
    
   
   
    
 
        var listId=(arrySearch1.filter(data => data.Cabin == arryCabin[nbr]));
    
    
    for(var i=0;i<listId.length;i++){
        resulteCabin.push(listId[i]);
    }
        await diplayData(resulteCabin,0);
  } 
  else {
    
    var NewArray= resulteCabin.filter((item) => item.Cabin !== arryCabin[nbr])
    resulteCabin=[];
    resulteCabin=NewArray;
    await diplayData(resulteCabin,0);
    if(resulteCabin.length===0){window.location="flight-sidebar";}
  }
}

async function clickChekS(ctchb,nbr){
    l.innerHTML=``;
    var checkBox = document.getElementById(ctchb);
    nbrPage=20;
   _i=0;

 if (checkBox.checked == true){
    
   
    
    
 
        var listId=(arrySearch1.filter(data => data.Stops == arryStop[nbr]));
    
    
    for(var i=0;i<listId.length;i++){
        resulteStop.push(listId[i]);
    }console.log("A"+resulteStop.length)
        await diplayData(resulteStop,0);
  } 
  else {
    console.log(resulteStop.length)
    var NewArray= resulteStop.filter((item) => item.Stops !== arryStop[nbr])
    resulteStop=[];
    resulteStop=NewArray;
    await diplayData(resulteStop,0);
    if(resulteStop.length===0){window.location="flight-sidebar";}
  }
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
                var rows=` <li  onclick="getdata(1,'${cityArry[i].city}')"> <center><a  href="#" style="color: #287dfa;">${cityArry[i].city}</a></center></li>`;
                tblCity.innerHTML+=rows;
            }
          
        }
        
     }
async function getdata(ident,txt)
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
    (typeHD!=true)?await desplayDay():await desplayNight();
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

  function bbb(){test=true;}
async function Funsearch(){
  
   var From,To,cabin,Airline,Days,FromDate,ToDate,dte;
   From=document.getElementById("sFrom").value;
   To=document.getElementById("sTo").value;
   cabin=document.getElementById("cabin").value;
   Days=document.getElementById("Days").value;
   var e=document.getElementById("Airline");
   Airline=e.options[e.selectedIndex].text;
   if(test==true){
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




var max=document.getElementById("max");
if(max){
    max.addEventListener("keyup",funMax);
}
var min=document.getElementById("min");
if(min){
    min.addEventListener("keyup",funMax);
}
var nbr1,nbr2
function funMax(){
    if(min.value=="")nbr1=0;
    else nbr1=min.value;
    if(max.value=="")nbr2=0;
    else nbr2=max.value;

    var p=document.getElementById("price1");
    p.innerHTML="";
    p.innerHTML="£"+nbr1+"-£"+nbr2;
}
var apply=document.getElementById("calcul");
if(apply){
    apply.addEventListener("click",FunCalcule);
}
var dataP=[];
async function FunCalcule(){
    l.innerHTML=``;
    nbrPage=20;
    _i=0;
    var listId=(arrySearch1.filter(data => (data.New_price >= nbr1 && data.New_price <= nbr2)));

    for(var i=0;i<listId.length;i++){
        dataP.push(listId[i]);
    }

    await diplayData(dataP,0);
}
var _i=0;
var data;
async function diplayData(dataA,stat)
{
    var lq=document.getElementById("btnLoad");
    lq.innerHTML=`<div class="col-lg-12" >          
                       <div class="btn-box mt-3 text-center">
                         <button type="button" class="theme-btn" id="more0" onclick="readMor();"><i class="la la-refresh mr-1"></i>Load More</button>
                         <p class="font-size-13 pt-2" id="Showing_Flights"></p>
                       </div>
                    </div>`;
    if(stat===0){tpage=dataA.length;data=dataA;} 
    document.getElementById("btnLoad").style.display="block";
    if(tpage<20){nbrPage=tpage;document.getElementById("btnLoad").style.display="none";}

    for(var i=_i;i<nbrPage;i++){
      
        var Nome=(data[i].Name=="comprGOOGL")?"GOOGLE FLIGHT":(data[i].Name=="comprGOOGLAirline")?"GOOGLE FLIGHT AIRLINE":(data[i].Name=="comprGOOGLBusiness")?"GOOGLE FLIGHT":(data[i].Name=="comprGOOGLPremium")?"GOOGLE FLIGHT":(data[i].Name=="comprGOOGLCOPY")?"GOOGLE FLIGHT DOMESTIC":(data[i].Name=="comprsky")?"Skyscanner":(data[i].Name=="quicksky")?"Skyscanner":(data[i].Name=="easyjet")?"EASYJET":(data[i].Name=="JET2HOLIDAYS")?"JET2HOLIDAYS":(data[i].Name=="t")?"AIRFACE":"HOLIDAY"
        var photoAirlin=(data[i].logo!=null)?data[i].logo:'';
        if(localStorage.getItem("To")==data[i].citys) {data[i].citys="";}
        if(data[i].Dates != null){data[i].Dates=data[i].Dates.slice(0,10);}else{data[i].Dates=data[i].Datest};
          (data[i].Arrive!=null)?(data[i].Arrive=data[i].Arrive.slice(0,10)):null;
          (data[i].Depart!=null)?(data[i].Depart=data[i].Depart.slice(0,10)):null;

          var rows=`<div class="col-lg-6 responsive-column">
          <div class="card-item flight-card flight--card">${(data[i].Image==null)?'<span class="badge" style="display: block;font-size: 14px; margin-bottom: 10px; background-color:#40cc6f;color:#fff;">'+Nome+'</span>':''}
          ${(data[i].Image!=null)?'<div class="card-img" style="padding: 4px 4px;">'+
                  '<img src="'+(data[i].Image!=null)?data[i].Image:null+'" alt="flight-img" style="max-width: 100%;max-height: 100%;"><span class="badge">'+Nome+'</span></div>':''}
                  
              
              <span class="badge" style="float:right;color:white;background-color: coral;">${(data[i].Days!=null)?data[i].Days:(data[i].Nights!=null)?data[i].Nights:''}</span>
              <span class="badge" style="float:left;color:white;background-color: coral;">${(data[i].Cabin!=null)?data[i].Cabin:(data[i].Guest!=null)?data[i].Guest+' Guests':''}</span>
              <div class="card-body">
                  <div class="card-top-title d-flex justify-content-between">
                      <div>
                          <h3 class="card-title font-size-17">${localStorage.getItem("To")}</h3>
                          <h6  Style=" color: red; margin-top:10px">${(data[i].Olde_price!=null)?'Old Price':''}</h6>
                          <h6  Style=" color: #287dfa; margin-top:10px">${(data[i].New_price!=null)?'New Price':'Total Price'}</h6>
                      </div>
                      <div>
                          <div class="text-right">
                          <p class="card-meta font-size-14">${(Nome=='EASYJET' || Nome=='JET2HOLIDAYS')?'Round trip flights':'Round trip'}</p>
                          <div><span  Style=" color: red; font-size:16px">${(data[i].Olde_price!=null)?'£'+data[i].Olde_price+'.00':''}</span></div><div><i class="${(data[i].New_price>data[i].Olde_price)?'icono-arrow2-up':(data[i].New_price<data[i].Olde_price)?'icono-arrow2-down':'icono-arrow2-down'}" style="color:${(data[i].New_price>data[i].Olde_price)?'red':(data[i].New_price<data[i].Olde_price)?'green':'grey'}"></i><span Style=" color: #287dfa; font-size:18px">£${(data[i].New_price!=null)?data[i].New_price:(data[i].Total_Price!=null)?data[i].Total_Price:data[i].Total}.00</span></div>
                          </div>
                      </div>
                  </div><!-- end card-top-title -->
                  <div class="flight-details">
                      <div class="flight-time">
                          <div class="flight-time-item take-off d-flex">
                              <div class="flex-shrink-0 mr-2">
                                  <i class="la la-plane"></i>ou 
                              </div>
                              <div>
                                  <h3 class="card-title font-size-15 font-weight-medium mb-0">From</h3>
                                  <p class="card-meta font-size-14">${localStorage.getItem("From")}: ${data[i].From}</p>
                              </div>
                             
                              <div class="flex-shrink-0 mr-2" style="float: right;">
                                  <i class="la la-plane"></i>
                              </div>
                              <div style="float: right;">
                                  <h3 class="card-title font-size-15 font-weight-medium mb-0">To</h3>
                                  <p class="card-meta font-size-14">${localStorage.getItem("To")}: ${(data[i].citys==localStorage.getItem("To"))?'':(data[i].citys!=null)?data[i].citys:(data[i].To_Airpot==localStorage.getItem("To"))?'':data[i].To_Airpot} ${data[i].To}</p>
                              </div>
                          </div>
                          ${(data[i].Airline!=null)?'<div class="flight-time-item take-off">'+
                        '<span class="color-text-2 mr-1">Airline: </span>'+
                          '<img src="'+photoAirlin+'" alt="flight-img"> </div>'
                          :(Nome=='EASYJET')?'<div class="flight-time-item take-off">'+
                          '<span class="color-text-2 mr-1">Airline: </span>'+
                            '<img src="/views/images/EASYJET.png" alt="flight-img"> </div>':
                            (Nome=='JET2HOLIDAYS')?'<div class="flight-time-item take-off">'+
                            '<span class="color-text-2 mr-1">Airline: </span>'+
                              '<img src="/views/images/JET2HOLIDAYS.png" alt="flight-img"> </div>':''}
                      </div><!-- end flight-time -->
                      <p class="font-size-14 text-center"><span class="color-text-2 mr-1">${(data[i].Dates!=null)?'Depart Date:':(data[i].Datest!=null)?'Date:':''} </span>${(data[i].Dates!=null)?data[i].Dates:(data[i].Datest!=null)?data[i].Datest:('Depart: '+data[i].Arrive+' Arrive: '+data[i].Depart)}</p>
                  </div><!-- end flight-details -->
                  <div class="btn-box text-center">
                  <input type="button" class="theme-btn theme-btn-small w-100 btn2" onclick='savedata(${i})' value="View Details">
                  </div>
              </div><!-- end card-body -->
          </div><!-- end card-item -->
                    </div>`;
          l.innerHTML+=rows;
        
          localStorage.removeItem("baba")
      }  
      document.getElementById("Showing_Flights").innerHTML=`Showing ${nbrPage} of ${tpage} Flights`  
}

function savedata(i){

    localStorage.removeItem("data");
    localStorage.setItem("data",JSON.stringify(data[i]));
    window.open('flight-booking');
 
};



function changeFunc() {
    var selectBox = document.getElementById("selectBox").selectedIndex;
   if(data.length>0){
    l.innerHTML=``;
    switch(selectBox){
        case 0:break;
        case 1:SortListPrice(selectBox);break;
        case 2:SortListPrice(selectBox);break;
        case 3:SortListDate(selectBox);break;
        case 4:SortListDate(selectBox);break;
    }
   }
    
}

function SortListDate(P){
    data.sort(function(a, b) {
        var keyA = new Date((a.Dates!=null)?a.Dates:(a.Arrive!=null)?a.Arrive:a.Datest),
          keyB = new Date((b.Dates!=null)?b.Dates:(b.Arrive!=null)?b.Arrive:b.Datest);
        // Compare the 2 dates
        if(P===4){
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        }
        else{
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        }
       
        
      });
      nbrPage=20;
      _i=0;
      diplayData("dataA",1)
}
function SortListPrice(P){
    data.sort(function(a, b) {
        var keyA = new Date((a.New_price!=null)?a.New_price:a.Total_Price),
          keyB = new Date((b.New_price!=null)?b.New_price:b.Total_Price);
        // Compare the 2 dates
        if(P===2){
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        }
        else{
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        }
       
        
      });
      nbrPage=20;
      _i=0;
      diplayData("dataA",1)
}



function readMor()
{
    if((tpage-nbrPage)>=20)
    {
        nbrPage+=20;
        _i+=20;
        diplayData("dataA",1)
    }
    else{
        _i=(nbrPage);
        nbrPage+=(tpage-nbrPage);
        
        document.getElementById("btnLoad").style.display="none";
        diplayData("dataA",1)
    }
}



var signup=document.getElementById("btnS");
if(signup){
    signup.addEventListener("click",FuSignup);
}

async function FuSignup(){
    signup.disabled=true;
    var vr=document.getElementsByClassName("form-control S");
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const dataD={full_name:vr[0].value,email:vr[1].value,phone_number:vr[2].value,password:vr[3].value,dateCreate:''+utc+''}
(vr[3].value===vr[3].value)?await Signup(dataD).then(response=>{
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
    typeHD=true;
}
function functiondays(){

    typeHD=false;
}




var arryD=[],arryN=[];
var vrDay=document.getElementById("Days");
async function desplayDay(){
    vrDay.innerHTML=``;
    arryD= await GetDay({From:document.getElementById("sFrom").value,To:document.getElementById("sTo").value});
    console.log(arryD.length);
    for(var i=0;i<arryD.length;i++){
        var rows=`<option value="${arryD[i].Days}">${arryD[i].Days}</option>`;
        vrDay.innerHTML+=rows;
    }
}

async function desplayNight(){
    vrDay.innerHTML=``;
    arryN= await GetNight({From:document.getElementById("sFrom").value,To:document.getElementById("sTo").value});
    for(var i=0;i<arryN.length;i++){
        var rows=`<option value="${arryN[i].Nights}">${arryN[i].Nights}</option>`;
        vrDay.innerHTML+=rows;
    }
}














var URL='https://s-hd.herokuapp.com/';

async function get1city(data) {
    const response=await fetch(`${URL}getCityCode`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function Search1(data) {
    const response=await fetch(`${URL}PostData`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
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
async function GetNight(data) {
    const response=await fetch(`${URL}GetNights`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function GetDay(data) {
    const response=await fetch(`${URL}GetDays`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
