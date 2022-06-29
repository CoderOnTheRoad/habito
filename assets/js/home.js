function getNDayAgoDate(n) {
    return new Date(new Date().getTime() - n*24*60*60*1000).toISOString().slice(0,10);
    }
    const dateSelector=document.getElementById("date");
    for(let i=0;i<=6;i++){
        let option=document.createElement("option");
        option.setAttribute("value",getNDayAgoDate(i));
        if(i==0){
            option.innerText=`Today ${getNDayAgoDate(i)}`;
            option.setAttribute("selected","true");
        }else{
            option.innerText=getNDayAgoDate(i);
        }
        dateSelector.appendChild(option);

    }