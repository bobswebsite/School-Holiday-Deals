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
document.getElementById("Load").onload=dashLoad;

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
     const arry=await GetPlan();
    
     var namePlan=document.getElementsByClassName("package__title");
     var PricePlan=document.getElementsByClassName("package__price");
     for(var i=0;i<arry.length;i++){
         if(i==0){
             namePlan[0].innerHTML=`${arry[i].NameVIP}`;
             PricePlan[0].innerHTML=`<span>$</span>${arry[i].Price}`;
         }if(i==1){
            namePlan[1].innerHTML=`${arry[i].NameVIP}`;
            PricePlan[1].innerHTML=`<span>$</span>${arry[i].Price}`;
        }
     }
}




var URL='https://s-hd.herokuapp.com/';
async function GetPlan() {
    var output
        await $.get(""+URL+"GetPlanVip", await function (data) {
            output = data
        });
        return output;
}