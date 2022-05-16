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
const gt=localStorage.getItem("Skay");
var dat=JSON.parse(gt)
document.getElementById("Load").onload =GridSearch;

async function GridSearch()
{
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
    else if(localStorage.getItem("admin")=="true"){dash[1].style.display='inline-block';}
    document.getElementById("found").innerHTML=`<h3 class="title font-size-24" >2 Flights found</h3>`;
    await desplayDat();
}

var l=document.getElementById("res1");

async function desplayDat(){
    l.innerHTML=``;
    for(var i=0;i<dat.length;i++){
        dat[i].Dates=dat[i].Dates.slice(0,10);
        var rows=`
        <div class="col-lg-4 responsive-column">
                <div class="card-item flight-card flight--card">
                    <div class="card-img" style="padding: 4px 4px;">
                        <img src="${dat[i].photos}" alt="flight-img" width="460" height="210">
                    </div>
                    <div class="card-body">
                        <div class="card-top-title d-flex justify-content-between">
                            <div>
                                <h3 class="card-title font-size-17">${dat[i].citys}</h3>
                                <h6  Style=" color: red; margin-top:10px">${(dat[i].Olde_price!=null)?'Old Price':'Name'}</h6>
                                <h6  Style=" color: #287dfa; margin-top:10px">${(dat[i].New_price!=null)?'New Price':'Total Price'}</h6>
                            </div>
                            <div>
                                <div class="text-right">
                                    <span class="font-weight-regular font-size-14 d-block">One way flight</span>
                                    <div><span  Style=" color: red">${(dat[i].Olde_price!=null)?'$'+dat[i].Olde_price+'.00':''}</span></div><div><h5 Style=" color: #287dfa">$${(dat[i].New_price!=null)?dat[i].New_price:''}.00</h5></div>
                                </div>
                            </div>
                        </div><!-- end card-top-title -->
                        <div class="flight-details py-3">
                            <div class="flight-time pb-3">
                                <div class="flight-time-item take-off d-flex">
                                    <div class="flex-shrink-0 mr-2">
                                        <i class="la la-plane"></i>
                                    </div>
                                    <div>
                                    <h3 class="card-title font-size-15 font-weight-medium mb-0">From</h3>
                                        <p class="card-meta font-size-14">${(dat[i].City_From=='unknow')?'':dat[i].City_From+':'}${dat[i].From}</p>
                                    </div>
                                </div>
                                <div class="flight-time-item landing d-flex">
                                    <div class="flex-shrink-0 mr-2">
                                        <i class="la la-plane"></i>
                                    </div>
                                    <div>
                                        <h3 class="card-title font-size-15 font-weight-medium mb-0">To</h3>
                                        <p class="card-meta font-size-14">${localStorage.getItem("ToS")}: ${(localStorage.getItem("ToS")!=dat[i].citys)?dat[i].citys:''} ${dat[i].To}</p>
                                    </div>
                                </div>
                            </div><!-- end flight-time -->
                            <p class="font-size-14 text-center"><span class="color-text-2 mr-1">Date: </span>${dat[i].Dates}</p>
                        </div><!-- end flight-details -->
                        <div class="btn-box text-center">
                            <a href="flight-single.html" class="theme-btn theme-btn-small w-100" onclick='savedata(${i})'>View Details</a>
                        </div>
                    </div><!-- end card-body -->
                </div><!-- end card-item -->
            </div>
        `;
        l.innerHTML+=rows;
    }
}


function savedata(i){
    document.getElementById("preloader").style.display='inline-block';
    localStorage.removeItem("data");
    localStorage.setItem("data",JSON.stringify(dat[i]));
    document.getElementById("preloader").style.display='none';
    window.open('flight-booking.html');
 
};

function changeFunc() {
    var selectBox = document.getElementById("selectBox").selectedIndex;
   if(dat.length>0){
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
    dat.sort(function(a, b) {
        var keyA = new Date(a.Dates),
          keyB = new Date(b.Dates);
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
    
      desplayDat();
}
function SortListPrice(P){
    dat.sort(function(a, b) {
        var keyA = new Date(a.New_price),
          keyB = new Date(b.New_price);
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
     
      desplayDat();
}
























