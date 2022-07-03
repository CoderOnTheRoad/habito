
const express=require("express");
const router=express.Router();

const homeController=require("../controllers/home_controller")
router.get("/",homeController.home);
router.use("/user",require("./user"));//routes for user action
router.use("/habit",require("./habit"));//routes for habit action

module.exports=router;