

document.getElementsByClassName("section-bg")[0].onload=dashLoad;

async function dashLoad(){

    (localStorage.getItem("idUser")!=null)?
    await TestId({ID:localStorage.getItem("idUser")}).then(response=>{
        (response[0]["verify"]!=true)?window.close():GetDash().then(output=>{
            const vr=document.getElementsByClassName("info__title");
            vr[2].innerHTML=output[0]["Total_User"];
            vr[0].innerHTML=output[0]["Total_Vip"];
            vr[1].innerHTML=output[0]["Total_Visitors"];
            vr[3].innerHTML='$'+output[0]["TotalPrice"];
            const vr1=document.getElementsByClassName("badge");
            vr1[0].innerHTML=output[0]["Total_Desktop"];
            vr1[1].innerHTML=output[0]["Total_Mobile"];
        });
    }):window.close();
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
async function GetDash() {
    var output
        await $.get(""+URL+"GetDashboard", await function (data) {
            output = data
        });
        return output;
}