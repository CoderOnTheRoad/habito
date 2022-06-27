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
module.exports.executeHabit=async function(req,res){
    const habitID=req.params.habitID;
    // console.log(habitID);
    // return res.redirect("/");
    // console.log(req.body)
    const dateOfExecution=req.body.date;
    const executionStatus=req.body.status;
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
        res.redirect("/");
    }

}