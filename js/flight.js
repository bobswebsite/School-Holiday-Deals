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
const gt=localStorage.getItem("data");
var dat=JSON.parse(gt)

document.getElementById("Load").onload =functionLoad;

async function functionLoad(){
    var dash=document.getElementsByClassName("dashboard1");
    dash[0].style.display='none';
    dash[1].style.display='none';
    if(localStorage.getItem("admin")=="false"){dash[0].style.display='inline-block';}
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';}
    
    (localStorage.getItem("idUser")!=null)?document.getElementById("login1").style.display='none':document.getElementById("login1").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login2").style.display='none':document.getElementById("login2").style.display='inline-block';
    document.getElementById("Sign_Out").style.display='none';
    if(localStorage.getItem("idUser")!=null){document.getElementById("Sign_Out").style.display='inline-block';}
    var Nome=(dat.Name=="comprGOOGL")?"GOOGLE FLIGHT":(dat.Name=="comprGOOGLAirline")?"GOOGLE FLIGHT AIRLINE":(dat.Name=="comprGOOGLBusiness")?"GOOGLE FLIGHT":(dat.Name=="comprGOOGLPremium")?"GOOGLE FLIGHT":(dat.Name=="comprGOOGLCOPY")?"GOOGLE FLIGHT DOMESTIC":(dat.Name=="comprsky")?"Skyscanner":(dat.Name=="quicksky")?"Skyscanner":(dat.Name=="easyjet")?"EASYJET":(dat.Name=="JET2HOLIDAYS")?"JET2HOLIDAYS":(dat.Name=="t")?"AIRFACE":"HOLIDAY"
    document.getElementById("name").innerHTML=`${Nome}`                                    
    document.getElementById("E11").innerHTML=`<a href="${dat.web}" target="_blank" class="d-block"><img src="${dat.photos}" alt="plane-img"></a>`;
    document.getElementById("A33").style.display='none';
    document.getElementById("C32").style.display='none';
    (dat.Name!="t")? await airface('none'):await airface('blok');
 const cityFrom=await get1city({city:dat.From});
 if(dat.City_From==null){dat.City_From='unknow'}
 const cityTo=await get1city({city:dat.To});
 var v=document.getElementById("E12");
     v.innerHTML=`<div class="d-flex justify-content-between">
    <div>
        <h3 class="card-title">${(cityFrom==1)?cityFrom[0].city:(dat.City_From!='unknow')?dat.City_From:dat.From} to ${cityTo[0].city}</h3>
        <p class="card-meta">One way Flight</p>
    </div>
</div>
<div class="card-rating">
    <span class="badge text-white">${(dat.Star!=null)?dat.Star:0}/5</span>
    <span class="review__text">Average</span>
    <span class="rating__text">(${(dat.Review!=null)?dat.Review:0} Reviews)</span>
</div>
<div class="section-block"></div>
<ul class="list-items list-items-2 list-items-flush py-2">
    <li class="font-size-15"><span class="w-auto d-block mb-n1"><i class="la la-plane mr-1 font-size-17"></i>From</span>${(cityFrom.length==1)?cityFrom[0].city:(dat.City_From!='unknow')?dat.City_From:dat.From}: ${dat.From}</li>
    <li class="font-size-15"><span class="w-auto d-block mb-n1"><i class="la la-clock-o mr-1 text-black font-size-17"></i>Date</span>${(dat.Dates!=null)?dat.Dates:(dat.Datest!=null)?dat.Datest:('Depart: '+dat.Arrive+' Arrive: '+dat.Depart)}</li>
    <li class="font-size-15"><span class="w-auto d-block mb-n1"><i class="la la-plane mr-1 font-size-17"></i>To</span>${(dat.Name!="comprsky")?cityTo[0].city:localStorage.getItem("ToS")}: ${(dat.Name!="comprsky")?(localStorage.getItem("To")==null)?'':(dat.citys==localStorage.getItem("To"))?'':(dat.citys!=null)?dat.citys:(dat.To_Airpot==localStorage.getItem("To"))?'':dat.To_Airpot:(localStorage.getItem("ToS")!=dat.citys)?dat.citys:''} ${dat.To}</li>
</ul>
<h3 class="card-title pb-3">Order Details</h3>
<div class="section-block"></div>
<ul class="list-items list-items-2 py-3">
    ${(dat.Airline!=null)?`<li><span>Airline:</span>${(dat.Airline!=null)?dat.Airline:""}</li>`:''}
    ${(dat.Cabin!=null)?`<li><span>Flight Type:</span>${(dat.Cabin!=null)?dat.Cabin:""}</li>`:''}
    <li Style=" color: #287dfa"><span>Total Price:</span>$${(dat.New_price!=null)? dat.New_price : (dat.Total_Price!=null)?dat.Total_Price:dat.Total}</li>
    ${(dat.Stops!=null)?`<li><span>Stops:</span>${(dat.Stops!=null)?dat.Stops:""}</li>`:''}
    <li><span>${(dat.Days!=null)?'Days:':(dat.Nights!=null)?'Nights':''}</span>${(dat.Days!=null)?dat.Days:(dat.Nights!=null)?dat.Nights:''}</li>
    ${(dat.baggage_Amount!=null)?`<li><span>baggage Amount:</span>${(dat.baggage_Amount!=null)?dat.baggage_Amount:""}</li>`:''}
</ul>
<div class="section-block"></div>
<ul class="list-items list-items-2 pt-3">
    <li><span>Price flight:</span>$${(dat.New_price!=null)? dat.New_price : (dat.Total_Price!=null)?dat.Total_Price:dat.Price_flight}</li>
    <li><span>Price Hotel:</span>$${(dat.Price_hote!=null)? dat.Price_hote : 0}</li>
    <li><span>Total Tax:</span>$${(dat.Total_Tax!=null)? dat.Total_Tax : 0}</li>
    <li  Style=" color: #287dfa"><span>Total Price:</span>$${(dat.Total!=null)? dat.Total : (dat.New_price!=null)? dat.New_price : (dat.Total_Price!=null)?dat.Total_Price:dat.Price_flight}</li>
</ul>`;


}

$(document).ready(async function(){
    $("#heart").click(async function(){
      if($("#heart").hasClass("liked")){
        $("#heart")('<i class="la la-heart-o" aria-hidden="true" style="color: #f9b851;cursor: pointer;font-size:30px;"></i>');
        $("#heart").removeClass("liked");
      }else{
        $("#heart")('<i class="la la-heart" aria-hidden="true" style="color: #f9b851;cursor: pointer;font-size:30px;"></i>');
        $("#heart").addClass("liked");
        const price=(dat.New_price!=null)?dat.New_price:(dat.Total_Price!=null)?dat.Total_Price:dat.Total;
        const dates=(dat.Dates!=null)?dat.Dates:dat.Arrive;
        const data={USERid:localStorage.getItem("idUser"),From:dat.From,To:dat.To,Date:''+dates+'',Price:price,name:dat.Name,Airlin:dat.Airline};
        console.log(data);
        await AddWishlist(data);
      }
    });
  });

 async function airface(styl){
    var N=document.getElementsByClassName("form-control");
    var vrb=document.getElementById("T121");
    vrb.style.display=styl;
    if(styl==="none"){
        if(dat.Name!="easyjet" && dat.Name!="JET2HOLIDAYS" && dat.Name!="Holiday"){
            N[0].value=dat.New_price;
            N[1].value=dat.Olde_price;
            N[2].value=dat.Difference;
            N[3].value=dat.Cheapest;
        }
        else{
            document.getElementById("A32").style.display='none';
            document.getElementById("A33").style.display='block';
            document.getElementById("C32").style.display='block';
            switch(dat.Name){
                case "easyjet":{ 
                   N[4].value=dat.Place;
                    break;}
                case "JET2HOLIDAYS":{ 
                    N[4].value=dat.Place;
                    break;}
                case "Holiday":{ 
                    N[4].value=dat.To_Airpot;
                    break;}
            }
            N[15].value=(dat.Hotel_name!=null)?dat.Hotel_name:"";
            N[16].value=(dat.Board!=null)?dat.Board:"";
            N[17].value=(dat.Guest!=null)?dat.Guest:"";
            N[18].value=(dat.Extras!=null)?dat.Extras:"";
            N[19].value=(dat.Rating!=null)?dat.Rating:"";
            N[20].value=(dat.Transfers!=null)?dat.Transfers:"";
            N[21].value=(dat.Hotel_info!=null)?dat.Hotel_info:"";
            N[22].value=(dat.has_more_options!=null)?dat.has_more_options:"";
            N[23].value=(dat.Hotel_Sript!=null)?dat.Hotel_Sript:"";
        }
        
    }
    else{
        N[0].value=dat.New_price;
        N[1].value=dat.Olde_price;
        N[2].value=dat.Difference;
        N[3].value=dat.Cheapest;
        N[5].value=(dat.Via!=null)?dat.Via:"unknown";
        N[6].value=(dat.Class!=null)?dat.Class:"unknown";
        N[7].value=(dat.Farebasis!=null)?dat.Farebasis:"unknown";
        N[8].value=(dat.Season!=null)?dat.Season:"unknown";
        N[9].value=(dat.TAX1!=null)?dat.TAX1:"unknown";
        N[10].value=(dat.TAX2!=null)?dat.TAX2:"unknown";
        N[11].value=(dat.TAX2!=null)?dat.TAX3:"unknown";
        N[12].value=(dat.Tcode1!=null)?dat.Tcode1:"unknown";
        N[13].value=(dat.Tcode2!=null)?dat.Tcode2:"unknown";
        N[14].value=(dat.Tcode3!=null)?dat.Tcode3:"unknown";
    }
}



$("#Confirm").on("click",function(){
    window.open(''+dat.web+'');
});

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







var URL='https://s-hd.herokuapp.com/';

async function get1city(data) {
    const response=await fetch(`${URL}getCityCode`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function AddWishlist(data){
    const response=await fetch(`${URL}postWishlist`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
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