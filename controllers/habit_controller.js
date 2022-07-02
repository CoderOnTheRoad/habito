const Users=require("../models/Users");
const Habits=require("../models/Habits");

//adds new habit to database from home page
module.exports.addHabit= async function(req,res){
    if(req.cookies.userCookie){
        const id=req.cookies.userCookie;
        const habitName = req.body.habit;
        const user=await Users.findById(id);
        // console.log(user);
        const habit=await new Habits({
            habitName:habitName,
            user:user._id,
        }); 
        user.userHabits.push(habit._id);
        user.save();
        habit.save();
        return res.redirect("/")
    }
}

//gives us difference between two dates 
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.

    return Math.abs((a - b) / _MS_PER_DAY);
}

//will not let you update the status of the habit if the date difference id >6
module.exports.executeHabit=async function(req,res){
    const habitID=req.params.habitID;
    const dateOfExecution=new Date(req.body.date);
    const executionStatus=req.body.status;
    const today=new Date(new Date().toISOString().slice(0,10));
    const diff=dateDiffInDays(dateOfExecution,today);
    // console.log(diff);
    if(diff<=6){
        const userID=req.cookies.userCookie;
        const habit=await Habits.findById(habitID);
        if(habit){
            habit.user=userID;
            const newDateAndStatus={
                date:dateOfExecution,
                status:executionStatus,
            }
            habit.dateAndStatus.push(newDateAndStatus);
            habit.save();   
        }

    }
    return res.redirect("/");

}

//shows us the detail view of habits
module.exports.detailView= async function(req,res){
    const userId=req.cookies.userCookie;
    if(userId){
        const userDetails=await Users.findById(userId).populate("userHabits");
        // console.log(userDetails);
        const userHabits=userDetails.userHabits;
        // console.log(userHabits);
        return res.render("detailHabits",{userCookie:userId,userHabits:userHabits,detailView:true});
    }
    return res.redirect("/");
}

//this function change the status of a habit (creates a new {date:,status:} object if the date is not in the database otherwise just updates the status)
//where a is the status

function changeStatusToA(a,habitDateAndStatusArr,date,habit,res){
    for(i of habitDateAndStatusArr){
        if(i.date.toISOString().slice(0,10)==date){
            i.status=a;
            habit.save();
            return res.status(200).json({status:a});
        }
    }
   habitDateAndStatusArr.push({
    date:date,
    status:a,
   })
   habit.save();
   return res.status(200).json({status:a});
}

//it is actually the API contrroller 
//updates the status from client side of the habit by date from the detailView page 
module.exports.updateStatus= async function(req,res){
    const habitStatus=req.query.habitStatus;
    const habitDate=req.query.habitDate;
    const date=new Date(habitDate).toISOString().slice(0,10);
    const habitID=req.query.habitID;
    const habit=await Habits.findById(habitID);
    const habitDateAndStatusArr=habit.dateAndStatus;
    // console.log(habitDateAndStatusArr);
    if(habitStatus=="None"){
        changeStatusToA("Done",habitDateAndStatusArr,date,habit,res);
    }else if (habitStatus=="Not done"){
        changeStatusToA("None",habitDateAndStatusArr,date,habit,res);
    }else{
        changeStatusToA("Not done",habitDateAndStatusArr,date,habit,res);
    }

}


module.exports.deleteHabit=async function(req,res){
    const habitID=req.params.habitID;
    const userID = req.cookies.userCookie;
    //delete the habit from the habit array of user
    const user=await Users.findById(userID);
    const habitsArray=user.userHabits;
    const index=habitsArray.indexOf(habitID);
    if(index==-1){
        console.log("the Habit does not exist");
        return res.redirect("/");
    }
    habitsArray.slice(index,1);
    user.save();
    //delete the habit from all habit database
    const habit = await Habits.findByIdAndRemove(habitID);;
    return res.redirect("/");
}