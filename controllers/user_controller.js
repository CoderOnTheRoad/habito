const Users = require("../models/Users");

module.exports.signInSignUp= async function(req,res){
    const userEmail=req.body.email;
    // console.log(userEmail);
    try{
        let user= await Users.findOne({userEmail:userEmail});
        if(user.length==0){
            user=new Users({
                userEmail:userEmail,
            });   
        }
        console.log(user);
        res.cookie("userCookie",user.id);
        res.cookie("userEmail",user.userEmail);
        return res.redirect("/");

    }catch(err){
        console.log("LoginError",err);
    }

}
module.exports.logOut=function(req,res){
    // console.log(res.cookies());
    res.clearCookie("userEmail");
    res.clearCookie("userCookie");
    return res.redirect("/")
}
