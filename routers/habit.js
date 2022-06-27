const express=require("express");
const router=express.Router();

const habitController=require("../controllers/habit_controller")
router.post("/addHabit",habitController.addHabit);
router.post("/executeHabit/:habitID",habitController.executeHabit);
module.exports=router;