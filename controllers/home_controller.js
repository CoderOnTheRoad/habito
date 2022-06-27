const Users= require("../models/Users");

module.exports.home=async function(req,res){
    const userCookie=req.cookies.userCookie;
    const userEmail=req.cookies.userEmail;
    if(userCookie!=undefined){
        return res.render("home",{userCookie:userCookie,userEmail:userEmail});
    }
    return res.render("home");
    // return res.render("home.ejs");
}