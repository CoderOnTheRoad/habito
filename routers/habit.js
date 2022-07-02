const express=require("express");
const router=express.Router();

const habitController=require("../controllers/habit_controller")
router.post("/addHabit",habitController.addHabit);//adds new habit
router.post("/executeHabit/:habitID",habitController.executeHabit); //performs the habit for the day or previous 6 days
router.get("/detailView",habitController.detailView);//view the habit execution status for today and previous 6 days
router.post("/updateStatus",habitController.updateStatus)//changes the execution status
router.get("/deleteHabit/:habitID",habitController.deleteHabit);//deletes the habit
module.exports=router;