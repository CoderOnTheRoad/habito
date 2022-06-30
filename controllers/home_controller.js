const Users= require("../models/Users");

//home controller
module.exports.home=async function(req,res){
    const userCookie=req.cookies.userCookie;
    const userEmail=req.cookies.userEmail;
    const habits=await Users.findById(userCookie).populate("userHabits");
    // console.log(habits);
    if(userCookie!=undefined){
        return res.render("home",{userCookie:userCookie,userEmail:userEmail,userHabits:habits.userHabits});
    }

    return res.render("home",{extractScripts:true});
    // return res.render("home.ejs");
}