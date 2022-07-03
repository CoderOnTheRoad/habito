const Users = require("../models/Users");
const axios =require("axios");
// const Noty = require('noty');
//sign in sign up controller
module.exports.signInSignUp= async function(req,res){
    const userEmail=req.body.email;
    try{    
        let response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=1da09f5487524aaf86aaac602faa7537&email=${userEmail}`);
        if(response.data.deliverability=="DELIVERABLE"){
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

        }else{
            // new Noty({
            //     text: 'Invalid Email!',
            // }).show();
            req.flash("message","Invalid Email!");
            console.log("Invalid Email");
            return res.redirect("/");
        }         

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


    // console.log(userEmail);
    // axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=1da09f5487524aaf86aaac602faa7537&email=${userEmail}`)
    // .then(response => {
    //     // console.log(response.data);
    //     if(response.data.deliverability=="DELIVERABLE"){


        //     }else{
    //         console.log("Not an Valid Email");
    //         return res.redirect("/");
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // })