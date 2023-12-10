const upperrectangle=document.getElementsByClassName("rectsvg");
// console.log(upperrectangle.length);
const lowerrectangle=document.getElementsByClassName("rectbotsvg");
let len=upperrectangle.length;
console.log(lowerrectangle);
let i=0;
setInterval(()=>{
        if(upperrectangle[i].style.display){
            upperrectangle[i].style.removeProperty("display");
        }
        else{
            upperrectangle[i].style.display="none";
        }
        if(lowerrectangle[i].style.display){
            lowerrectangle[i].style.removeProperty("display");
        }
        else{
            lowerrectangle[i].style.display="none";
        }
        i++;
        if(i==4){
            i=0;
        }
},250);