document.getElementsByClassName("section-bg")[0].onload=dashLoad;

var  arry=[];
async function dashLoad(){
   
  
    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    arry= await Getmsg();
    if(arry.length>0){desplayPay(arry);}
    
}



function desplayPay(arry)
{
    var vr=document.getElementById("Get_SendEmail");
    for(var i=0;i<arry.length;i++){
        const d = new Date(arry[i].dateSend);
        var rows=`  <div class="comment">
        <div class="comment-avatar">
            <img class="avatar__img" alt="" src="https://www.oceanscalmmassage.com/wp-content/uploads/2021/07/Male-Avatar.jpg">
        </div>
        <div class="comment-body">
            <div class="meta-data">
                <h3 class="comment__author">${arry[i].username}</h3>
                <div class="meta-data-inner d-flex">
                <p class="comment__meta mr-1">By <a style="color:black">${arry[i].emailClient}</a></p>
                <p class="comment__date"> (${d.toDateString()})</p>
                </div>
            </div>
            <p class="comment-content">${arry[i].message}</p>
            <div class="comment-reply">
                <a class="theme-btn" href="#" data-toggle="modal" data-target="#modalPopup" onclick='charge(${i})'>
                    <span class="la la-mail-reply mr-1"></span>Reply
                </a>
            </div>
        </div>
    </div>`;
        vr.innerHTML+=rows;
    }
}

var gmail,ID;
function charge(i){
    gmail=arry[i].emailClient;
    ID=arry[i].idEmail;
}




var Replay=document.getElementById("Replay");
if(Replay){
    Replay.addEventListener("click",sendMessag);
}

async function sendMessag(){
    
    var msg=document.getElementById("msgReplay").value;
    var sbjt='Reply to your message!!';
   const data={EmailTo:gmail,subject:sbjt,text:msg};
  
    if(document.getElementById("msgReplay").value!=""){
        document.getElementById("preloader").style.display='block';
       await sendReplay(data).then(response=>{
           if(response.ok){
             RemoveMsg({Id:ID}).then(res=>{
                if(res.ok){
                    alert("massage has been sent");
                    document.getElementById("preloader").style.display='none';
                    window.location.reload();
                }else{
                    alert("A server error occurred");
                    document.getElementById("preloader").style.display='none';
                }
            })
           }else{
            alert("A gmail error occurred");
            document.getElementById("preloader").style.display='none';
            console.log(response);
           }
       });
    }
}







var URL='https://s-hd.herokuapp.com/';

async function TestId(data) {
    const response=await fetch(`${URL}TestIdUser`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function Getmsg() {
    var output
        await $.get(""+URL+"GetEmail", await function (data) {
            output = data
        });
        return output;
}
async function sendReplay(data) {
    const response=await fetch(`${URL}sendMessage`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function RemoveMsg(data) {
    const response=await fetch(`${URL}deletemsg`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}