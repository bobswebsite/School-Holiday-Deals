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
    const list=await Getabt(); 

    desplayPay(list);
}



function desplayPay(list){
 
    var A=document.getElementById("HeaderAbout"),B=document.getElementById("bodyabout");
    var F=document.getElementById("finAbout"),nbr=0;
    var rr=[8,9,10,11,12,13];
    for(var i=0; i<list.length;i++){
        if(list[i].id_about>0 && list[i].id_about<4){
            var rows=`  <div class="col-lg-4 responsive-column">
            <div class="card-item" data-toggle="tooltip" data-placement="top" title="hello word">
                <div class="card-img">
                    <img src="images/img21.jpg" alt="about-img">
                </div>
                <div class="card-body">
                    <h3 class="card-title mb-2">${list[i].header}</h3>
                    <p class="card-text">
                    ${list[i].body}
                    </p>
                </div>
            </div><!-- end card-item -->
        </div><!-- end col-lg-4 -->`;

            A.innerHTML+=rows;
        }
        else if(list[i].id_about===4){
            var rows=`<div class="section-heading margin-bottom-40px">
            <h2 class="sec__title">${list[i].header}</h2>
            <h4 class="title font-size-16 line-height-26 pt-4 pb-2">${list[i].object}</h4>
            <p class="sec__desc font-size-16 pb-3">${list[i].body}</p>
            </div><!-- end section-heading -->`;
            B.innerHTML+=rows;

        }
        else if(list[i].id_about>4){
            var rows=`<div class="testimonial-card">
            <div class="author-content d-flex align-items-center">
                <div class="author-img">
                    <img src="images/team${rr[nbr]}.jpg" alt="testimonial image">
                </div>
                <div class="author-bio">
                    <h4 class="author__title">${list[i].header}</h4>
                    <span class="author__meta">${list[i].object}</span>
                    <span class="ratings d-flex align-items-center">
                        <i class="la la-star"></i>
                        <i class="la la-star"></i>
                        <i class="la la-star"></i>
                        <i class="la la-star"></i>
                        <i class="la la-star"></i>
                    </span>
                </div>
            </div>
            <div class="testi-desc-box">
                <p class="testi__desc">${list[i].body}</p>
            </div>
        </div>`;
        F.innerHTML+=rows;
        nbr++;
        }
    }
}


var URL='https://s-hd.herokuapp.com/';
async function Getabt() {
    var output
        await $.get(""+URL+"GetAbout", await function (data) {
            output = data
        });
        return output;
}