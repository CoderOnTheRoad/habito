const Users=require("../models/Users");
module.exports.addHabit= async function(req,res){
    if(req.cookies.userCookie){
        const id=req.cookies.userCookie;
        const user=await Users.findById(id);
        const habit = req.body.habit;
        user.userHabits.push(habit);
        user.save();
        return res.redirect("/")
    }
}