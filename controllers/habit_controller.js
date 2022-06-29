const Users=require("../models/Users");
const Habits=require("../models/Habits");
module.exports.addHabit= async function(req,res){
    if(req.cookies.userCookie){
        const id=req.cookies.userCookie;
        const habitName = req.body.habit;
        const user=await Users.findById(id);
        console.log(user);
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


// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.

    return Math.abs((a - b) / _MS_PER_DAY);
}

module.exports.executeHabit=async function(req,res){
    const habitID=req.params.habitID;
    // console.log(habitID);
    // return res.redirect("/");
    // console.log(req.body)
    const dateOfExecution=new Date(req.body.date);
    const executionStatus=req.body.status;
    const today=new Date(new Date().toISOString().slice(0,10));
    const diff=dateDiffInDays(dateOfExecution,today);
    console.log(diff);
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

module.exports.detailView= async function(req,res){
    const userId=req.cookies.userCookie;
    if(userId!=undefined){
        const userDetails=await Users.findById(userId).populate("userHabits");
        console.log(userDetails);
        const userHabits=userDetails.userHabits;
        console.log(userHabits);
    }
    res.render("detailHabits.ejs");
}