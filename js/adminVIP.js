document.getElementsByClassName("section-bg")[0].onload=dashLoad;
var arryPay=[];
var _i=0,count=10;
const vr=document.getElementById("Table__Payment");

async function dashLoad(){

    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    arryPay= await GetAllUsersActive();
    if(arryPay.length>0){desplayPay();}
}

function desplayPay()
{
    if(arryPay.length<=10)count=arryPay.length;
document.getElementsByClassName("font-size-14")[0].innerHTML=`Showing ${_i+1} to ${count} of ${arryPay.length} entries`;
    for(var i=_i;i<count;i++){
        if(arryPay[i].statu==null)arryPay[i].statu=false;
        var rows=`  <tr>
        <th scope="row">${arryPay[i].id}</th>
        <td>
            <div class="table-content">
                <h3 class="title">${arryPay[i].full_name}</h3>
            </div>
        </td>
        <td><a class="color-text">${(arryPay[i].DateE!=null)?arryPay[i].DateE.slice(0,10):'Inactive'}</a></td>
        <td>${(arryPay[i].DateF!=null)?arryPay[i].DateF.slice(0,10):'Inactive'}</td>
        <td>${(arryPay[i].DATEDIFF!=null)?arryPay[i].DATEDIFF:'Inactive'}</td>
        <td><span class="${(arryPay[i].statu!=false)?'badge badge-success py-1 px-2':'badge badge-danger py-1 px-2'}">${(arryPay[i].statu!=false)?'Active':'Inactive'}</span></td>
        <td>
            <div class="table-content">
                <a href="#" class="theme-btn theme-btn-small" data-toggle="tooltip" data-placement="top" title="Edit"><i class="la la-trash-alt"></i></a>
            </div>
        </td>
    </tr>`;
    vr.innerHTML+=rows;
    }
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

async function GetAllUsersActive() {
    var output
        await $.get(""+URL+"GetUserActive", await function (data) {
            output = data
        });
        return output;
}