document.getElementsByClassName("section-bg")[0].onload=dashLoad;
var arryPay=[];
var _i=0,count=10;
const vr=document.getElementById("Table__Payment");

async function dashLoad(){

    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    arryPay= await GetAllUsers();
    if(arryPay.length>0){desplayPay();}
}

function desplayPay()
{
    if(arryPay.length<=10)count=arryPay.length;
document.getElementsByClassName("font-size-14")[0].innerHTML=`Showing ${_i+1} to ${count} of ${arryPay.length} entries`;
    for(var i=_i;i<count;i++){
        var rows=` <tr>                      
        <th scope="row">${arryPay[i].id}</th>
        <td>
            <div class="table-content">
                <h3 class="title">${arryPay[i].full_name}</h3>
            </div>
        </td>
        <td>${arryPay[i].email}</td>
        <td>${arryPay[i].phone_number}</td>
        <td>${arryPay[i].dateCreate.slice(0,10)}</td>
        <td><span class="${(arryPay[i].admin)?'badge badge-warning text-white py-1 px-2':'badge badge-success py-1 px-2'}">${(arryPay[i].admin)?'admin':'user'}</span></td>
        <td>
            <div class="table-content">
                <a href="#"  onclick='openuser(${i})' class="theme-btn theme-btn-small mr-2" data-toggle="tooltip" data-placement="top" title="View"><i class="la la-eye"></i></a>
                </div>
        </td>
    </tr>`;
    vr.innerHTML+=rows;
    }
}


function openuser(i){
sessionStorage.setItem("id",arryPay[i].id);
window.open('user-profile');
}

let cursor=1;
var vrb=document.getElementById("curser");
$("#Previous").on("click",function(){
   
   if(count>10 && count<arryPay.length){
        count-=10;
        _i-=10;
        desplayPay();
        vrb.innerHTML=`${cursor--} <span class="sr-only">(current)</span>`;
    }
    else if(count>10 && count==arryPay.length){
        count-=(count%10);
        _i-=10;
        desplayPay();
        vrb.innerHTML=`${cursor--} <span class="sr-only">(current)</span>`;
    }
    else{console.log(count);}
});

$("#Next").on("click",function(){
    if((arryPay.length-count)>=10)
    {
        count+=10;
        _i+=10;
        desplayPay();
        vrb.innerHTML=`${cursor++} <span class="sr-only">(current)</span>`;
    }
    else if((arryPay.length-count)==0){
        console.log(arryPay.length-count);
    }
    else{
         _i=(count);
         count+=(arryPay.length-count);
         desplayPay();
         vrb.innerHTML=`${cursor++} <span class="sr-only">(current)</span>`;
    }
});












var URL='https://s-hd.herokuapp.com/';

async function TestId(data) {
    const response=await fetch(`${URL}TestIdUser`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response.json();
}

async function GetAllUsers() {
    var output
        await $.get(""+URL+"GetUsers", await function (data) {
            output = data
        });
        return output;
}