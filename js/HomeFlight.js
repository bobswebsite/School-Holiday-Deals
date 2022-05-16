document.getElementsByClassName("section-bg")[0].onload=dashLoad;

var  arry=[];
async function dashLoad(){
    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():null;
    }):window.close();
    arry = await GethomeAdmin();
    if(arry.length>0) desplay();
}

async function desplay(){
   
    var vr=document.getElementById("cty");
for(var i=0 ;i<arry.length;i++){

    var rows=`<div class="row">
    <div class="col-lg-5 responsive-column">
        <div class="input-box">
            <span class="label-text">From</span>
            <div class="form-group">
                <span class="la la-map-marker form-icon"></span>
                <input class="form-control" type="text" placeholder="airport" value="${arry[i].From}" id="From${i}">
                <ul id="myUL_F" style="border-radius: 4px; border: 1px solid #287dfa;">
                </ul>
            </div>
        </div>
    </div><!-- end col-lg-6 -->
    <div class="col-lg-5 responsive-column">
        <div class="input-box">
            <span class="label-text">To</span>
            <div class="form-group">
                <span class="la la-map-marker form-icon"></span>
                <input class="form-control" type="text" placeholder="airport" value="${arry[i].To}" id="To${i}">
                <ul  id="myUL_T" style="border-radius: 4px; border: 1px solid #287dfa;">
                </ul>
            </div>
        </div>
    </div><!-- end col-lg-6 -->
    <div class="col-lg-2 responsive-column">
        <div class="input-box">
            <span class="label-text" style="color:white;">.</span>
            <div class="form-group">
                <button class="theme-btn small" id="ADD10" onclick='addAirport(${i})'>ADD</button>
            </div>
        </div>
    </div>
              </div>`
vr.innerHTML+=rows;
}
}

var cnf=document.getElementById("Confirm");
if(cnf){
    cnf.addEventListener("click",function_Add);
} 
async function addAirport(i){
    const data={from:document.getElementById("From"+i+""),to:document.getElementById("To"+i+""),fromD:arry[i].From,toD:arry[i].To}
await AddbestFlight(data).then(res=>{
    if(res.ok){
        alert("Added successfully!!");
        cnf.style.display="inline-block";
    };

});
}




var cnf=document.getElementById("Confirm");
if(cnf){
    cnf.addEventListener("click",function_Add);
}



async function function_Add()
{
    await ConfirmAdd().then(res=>{
        if(res.ok){alert("Confirm successfully!!");cnf.style.display="none";}
    })
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

async function GethomeAdmin() {
    var output
        await $.get(""+URL+"GetFlighthomeAdmin", await function (data) {
            output = data
        });
        return output;
}

async function AddbestFlight(data) {
    const response=await fetch(`${URL}ADDCITyhome`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
    });
    return response;
}

async function ConfirmAdd() {
    const response=await fetch(`${URL}ConfirmAdd`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify()
    });
    return response;
}