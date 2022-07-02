const Users = require("../models/Users");

//sign in sign up controller
module.exports.signInSignUp= async function(req,res){
    const userEmail=req.body.email;
    // console.log(userEmail);
    try{
        let user= await Users.findOne({userEmail:userEmail});
        if(!user){
            user=new Users({
                userEmail:userEmail,
            });
            user.save();   
        }
        // console.log(user);
        res.cookie("userCookie",user.id);
        res.cookie("userEmail",user.userEmail);
        return res.redirect("/");

    }catch(err){
        console.log("LoginError",err);
    }

}

//logOut controller
module.exports.logOut=function(req,res){
    // console.log(res.cookies());
    res.clearCookie("userEmail");
    res.clearCookie("userCookie");
    res.clearCookie("delailView");
    return res.redirect("/")
}
