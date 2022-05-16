
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

document.getElementById("Load").onload =FunctionProfile;
let id;
async function FunctionProfile()
{
    var profil=[];
    var l=document.getElementById("info");
    document.getElementById("preloader").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login1").style.display='none':document.getElementById("login1").style.display='inline-block';
    (localStorage.getItem("idUser")!=null)?document.getElementById("login2").style.display='none':document.getElementById("login2").style.display='inline-block';
    document.getElementById("Sign_Out").style.display='none';
    if(localStorage.getItem("idUser")!=null){document.getElementById("Sign_Out").style.display='inline-block';}

    if(localStorage.getItem("admin")==null)localStorage.setItem("admin",null);
    var dash=document.getElementsByClassName("dashboard1");
    dash[0].style.display='none';
    dash[1].style.display='none';
    if(localStorage.getItem("admin")=="false"){dash[0].style.display='inline-block';}
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';}
   else
   {
        window.location='index.html';
    }
    
    (sessionStorage.getItem("id")!=null)?profil=await openProfile({USERid:sessionStorage.getItem("id")}):(localStorage.getItem("idUser")!=null)?profil=await openProfile({USERid:localStorage.getItem("idUser")}):null;
    
    if(profil.length>0){
        
        for(var i=0;i<profil.length;i++){
            if(profil[i].statu==null)profil[i].statu=false;
            var rows=`<h3 class="card-title">${profil[i].full_name}</h3>
            <p class="card-meta">${profil[i].dateCreate=profil[i].dateCreate.slice(0,10)}</p>
            <div class="d-flex justify-content-between pt-3">
                <ul class="list-items list-items-2 flex-grow-1">
                    <li><span>Email:</span>${profil[i].email}</li>
                    <li><span>Phone:</span>${profil[i].phone_number}</li>
                </ul>
                 <ul class="list-items flex-grow-1">
                    <li ><h3 class="theme-btn theme-btn-small theme-btn-rgb" style="color: rgb(255, 255, 255); background-color: #f9b851;">VIP</h3></li>
                    <li class="d-flex justify-content-between align-items-center"><span class="color-text-2 font-weight-medium mr-2">Status</span><span class="theme-btn theme-btn-small theme-btn-rgb ${(profil[i].statu==false)?'theme-btn-danger-rgb':''}">${(profil[i].statu==false)?'Not Enabled':'Enabled'}</span></li>
                    <li class="d-flex justify-content-between align-items-center"><span class="color-text-2 font-weight-medium mr-2">Starting Date</span><span class="theme-btn theme-btn-small theme-btn-rgb ${(profil[i].statu==false)?'theme-btn-danger-rgb':''}">${(profil[i].statu==false)?'Not Enabled':profil[i].DateE=profil[i].DateE.slice(0,10)}</span></li>
                    <li class="d-flex justify-content-between align-items-center"><span class="color-text-2 font-weight-medium mr-2">Expiry Date</span><span class="theme-btn theme-btn-small theme-btn-rgb ${(profil[i].statu==false)?'theme-btn-danger-rgb':''}">${(profil[i].statu==false)?'Not Enabled':profil[i].DateF=profil[i].DateF.slice(0,10)}</span></li>
                    <li class="d-flex justify-content-between align-items-center"><span class="color-text-2 font-weight-medium mr-2">The number of days</span><span class="theme-btn theme-btn-small theme-btn-rgb ${(profil[i].statu==false)?'theme-btn-danger-rgb':''}">${(profil[i].statu==false)?'0':profil[i].DATEDIFF}</span></li>
                </ul>
            </div>`;
          l.innerHTML+=rows;
        }
           id=profil[0].id;
           await desplayWishlist();
    }

}
let Wishlist=[];
async function desplayWishlist()
{
    Wishlist=await openWishlist({USERid:id});
    document.getElementById("cnt").innerHTML=`${Wishlist.length}`;
    var d=document.getElementById("ID-Wishlist");
    for(var i=0;i<Wishlist.length;i++)
    {    if(Wishlist[i].Dates!=null)Wishlist[i].Dates=Wishlist[i].Dates.slice(0,10);
         else{Wishlist[i].Depart=Wishlist[i].Depart.slice(0,10);
         Wishlist[i].Arrive=Wishlist[i].Arrive.slice(0,10);}
        var rows=`<div class="card-item card-item-list">
        <div class="card-img">
            <a href="#" class="d-block" onclick='savedata(${i})'>
                <img src="${Wishlist[i].photos}" alt="hotel-img">
            </a>
            <span class="badge">Featured</span>
        </div>
        <div class="card-body">
            <h3 class="card-title"><a href="#" onclick='savedata(${i})'>${(Wishlist[i].cityFrom!=null)?Wishlist[i].cityFrom+' ':''}${'('+Wishlist[i].From+')'} To ${(Wishlist[i].citys!=null)?Wishlist[i].citys:Wishlist[i].To_Airpot} (${Wishlist[i].To})</a></h3>
            <p class="card-meta">${(Wishlist[i].Dates!=null)?'Date: '+Wishlist[i].Dates:'Depart: '+Wishlist[i].Arrive}</p>
            <p class="card-meta">${(Wishlist[i].Dates!=null)?'':'Arrive:  '+Wishlist[i].Depart}</p>
            <div class="card-rating d-flex align-items-center pt-1">
                <span class="rating__text">Hotel star</span>
                <span class="ratings d-flex align-items-center mx-2">
                    <i class="${(Wishlist[i].Star>=1)?'la la-star':'la la-star-o'}"></i>
                    <i class="${(Wishlist[i].Star>=2)?'la la-star':'la la-star-o'}"></i>
                    <i class="${(Wishlist[i].Star>=3)?'la la-star':'la la-star-o'}"></i>
                    <i class="${(Wishlist[i].Star>=4)?'la la-star':'la la-star-o'}"></i>
                    <i class="${(Wishlist[i].Star>=5)?'la la-star':'la la-star-o'}"></i>
                </span>
                <span class="rating__text">${(Wishlist[i].Star!=null)?Wishlist[i].Star:0} of 5</span>
            </div>
            <div class="card-price d-flex align-items-center justify-content-between">
                <p>
                    <span class="price__from">Price from</span>
                    <span class="price__num">$${(Wishlist[i].New_price!=null)?Wishlist[i].New_price:(Wishlist[i].Total_Price!=null)?Wishlist[i].Total_Price:Wishlist[i].Total}.00</span>
                </p>
                <a href="#" class="theme-btn theme-btn-small" onclick='savedata(${i})'>Read details</a>
            </div>
        </div>
    </div>`;

        d.innerHTML+=rows;
    }

}

function savedata(i){
    document.getElementById("preloader").style.display='inline-block';
    localStorage.removeItem("data");
    localStorage.setItem("data",JSON.stringify(Wishlist[i]));
    document.getElementById("preloader").style.display='none';
    window.open('flight-booking.html');
 
};

var send=document.getElementById("send-message-btn");
if(send){
    send.addEventListener("click",funcSendmsg);
}

async function funcSendmsg(){
var name=document.getElementById("username");
var email=document.getElementById("email");
var Message=document.getElementById("message");
const data={username:name.value,emailClient:email.value,message:Message.value};
await SendMessages(data).then(response=>{
    if(response.ok){
        alert("We have received your message, thank you");
        location.reload();
    };
});
}










var URL='https://s-hd.herokuapp.com/';

async function openWishlist(data){
    const response=await fetch(`${URL}GetWishlist`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function openProfile(data){
    const response=await fetch(`${URL}Getpfofile`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function SendMessages(data) {
    const response=await fetch(`${URL}sendMsg`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}