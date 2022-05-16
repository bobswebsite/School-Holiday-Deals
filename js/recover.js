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
}


var restP=document.getElementById("ResetPassword");
if(restP){
    restP.addEventListener("click",sendMotPass);
}


async function sendMotPass(){
    document.getElementById("preloader").style.display='inline-block';
    const email=document.getElementById("email");
    await SendEmailValid({Email:email.value}).then(res=>{
        if(res["status"]==true){document.getElementById("preloader").style.display='none';
            alert("The password has been sent to your email");
        }else{document.getElementById("preloader").style.display='none';
            alert("Your email does not exist");
        }
    });
}




var URL='https://s-hd.herokuapp.com/';
async function SendEmailValid(data) {
    const response=await fetch(`${URL}verefyEmail`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}