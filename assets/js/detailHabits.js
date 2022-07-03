
const dateContainer=document.getElementById("week-dates");
const habitTableBody=document.getElementById("habit-table-body");
const tableDataContainer=document.getElementById("tableData");
//this function gives me the date that is n day ago from today's date 

function getNDayAgoDate(n) {
    return new Date(new Date().getTime() - n*24*60*60*1000).toISOString().slice(0,10);
}
const userHabits=JSON.parse(tableDataContainer.innerText);

//Updates the table rows or the habit names in the detail view of habits

for(let i=0;i<userHabits.length;i++){
    const habit=userHabits[i];
    // console.log(habit);
    let tr=document.createElement("tr");
    tr.setAttribute("id",`habitID-${habit._id}`);
    tr.setAttribute("scope","row");
    let td=document.createElement("td");
    td.innerText=habit.habitName;
    td.classList.add("table-dark");
    tr.appendChild(td);
    habitTableBody.appendChild(tr);

}

//updates the table heads in the detail view of habit

for(let i=0;i<=6;i++){
    let th=document.createElement("th");
    th.setAttribute("scope","col");
    const dateString=getNDayAgoDate(i);
    th.innerText=dateString;
    dateContainer.appendChild(th);

}

//updates the habit's status datewise in the detail view of habit

for(let j=0;j<userHabits.length;j++){
    for(let i=0;i<=6;i++){
        let habit=userHabits[j];
        const habitRow=document.getElementById(`habitID-${habit._id}`);
        let td=document.createElement("td");
        const dateString=getNDayAgoDate(i);
        const dateAndStatusArray=habit.dateAndStatus;
        // console.log(dateAndStatusArray);
        td.innerText="None";
        // td.style.backgroundColor="grey";
        td.setAttribute("data-habitDate",dateString);
        td.setAttribute("data-habitID",habit._id);
        td.setAttribute("data-habitStatus","None");
        td.setAttribute("onclick","changeStatusOnClick(this)")
        td.classList.add("status-none")
        // td.classList.add("changeStatusOnClick")
        for(let k=0;k<dateAndStatusArray.length;k++){
            // console.log(dateAndStatusArray[k].date);       
            if(new Date(dateAndStatusArray[k].date).toISOString().slice(0,10)==dateString){
                td.innerText=dateAndStatusArray[k].status;
                if(dateAndStatusArray[k].status=="Done"){
                    // td.style.backgroundColor="green";
                    td.setAttribute("data-habitStatus",dateAndStatusArray[k].status);  
                    td.setAttribute("class","");             
                    td.classList.add("status-done")
                }else if(dateAndStatusArray[k].status=="Not done"){
                    // td.style.backgroundColor="red";
                    td.setAttribute("data-habitStatus",dateAndStatusArray[k].status);
                    td.setAttribute("class","");
                    td.classList.add("status-not-done");
                }
            }
        }
        habitRow.appendChild(td);
    }
}

//calls our API with some query and updates the status of the habit by API call from the server Side

function changeStatusOnClick(element){
    const habitStatus=element.getAttribute("data-habitStatus");
    const habitDate=element.getAttribute("data-habitDate");
    const habitID=element.getAttribute("data-habitID");
    fetch(`http://localhost:3000/habit/updateStatus?habitStatus=${habitStatus}&habitDate=${habitDate}&habitID=${habitID}`,{method:"post"})       // desired endpoint URL
    .then(response => response.json())       // convert response to JSON
    .then(json => {
        element.setAttribute("data-habitStatus",json.status);
        element.innerText=json.status;
        if(json.status=="None"){
            element.setAttribute("class","");
            element.classList.add("status-none")
        }else if(json.status=="Done"){
            element.setAttribute("class","");
            element.classList.add("status-done")
        }else{
            element.setAttribute("class","");
            element.classList.add("status-not-done")
        }
    }); 

}
