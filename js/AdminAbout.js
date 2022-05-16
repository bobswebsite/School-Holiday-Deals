

document.getElementsByClassName("section-bg")[0].onload=dashLoad;

var  arry=[];
async function dashLoad(){
    document.getElementById("notif").style.display='none';
    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    arry= await Getabt();
    if(arry.length>0){desplayPay(arry);}
}
function desplayPay(arry)
{
    var vr=document.getElementById("selectTitle");
    for(var i=0;i<arry.length;i++){
        var rows=`<option value="${arry[i].id_about}">${arry[i].header}</option>`;
        vr.innerHTML+=rows;
    }
}
    var t=document.getElementById("Title");
    var o=document.getElementById("Object");
    var b=document.getElementById("txtbody");
    var selectedValue;
function changeFunc() {
    var selectBox = document.getElementById("selectTitle");
    selectedValue= selectBox.options[selectBox.selectedIndex].value;
    t.value=arry[selectedValue-1].header;
    o.value=arry[selectedValue-1].object;
    b.value=arry[selectedValue-1].body;
   }

   var Confirm=document.getElementById("Confirm");
   if(Confirm){
    Confirm.addEventListener("click",Function_Confirm);
   }


async function Function_Confirm(){
    Confirm.style.display='none';
    t.value = t.value.replace("'", "''");
    o.value = o.value.replace("'", "''");
    b.value = b.value.replace("'", "''");
       await Updateabout({id_about:selectedValue,header:t.value,object:o.value,body:b.value}).then(response=>{
           if(response.ok){
            document.getElementById("notif").style.display='inline-block';
            geet();
           }
       });
    
}
async function geet(){setTimeout( function() {document.getElementById("notif").style.display='none';location.reload();},1500);};















var URL='https://s-hd.herokuapp.com/';

async function TestId(data) {
    const response=await fetch(`${URL}TestIdUser`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}
async function Getabt() {
    var output
        await $.get(""+URL+"GetAbout", await function (data) {
            output = data
        });
        return output;
}

async function Updateabout(data) {
    const response=await fetch(`${URL}updateAbout`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}