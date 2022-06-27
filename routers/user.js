const express=require("express");
const router=express.Router();

const userController=require("../controllers/user_controller")
router.post("/signInSignUp",userController.signInSignUp);
router.post("/logOut",userController.logOut);
module.exports=router;