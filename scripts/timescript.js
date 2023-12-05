const time=document.getElementById("timeremaining");
let timevaluesecond=2;
let timevaluemin=0;
const myinterval=setInterval(()=>{
    if(timevaluemin==0){
        time.style.color="red";
    }
    time.innerText=`${timevaluemin}`+":"+`${timevaluesecond}`;
    timevaluesecond--;
    if(timevaluemin==0 && timevaluesecond==-1){
        time.innerText=`${timevaluemin}`+":"+`${timevaluesecond}`;
        clearInterval(myinterval);
        alert("timeover")
    }
    if(timevaluesecond==-1){
        timevaluemin--;
        timevaluesecond=60;
    }
},1000)