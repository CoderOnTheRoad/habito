const express=require("express");
const router=express.Router();

const habitController=require("../controllers/habit_controller")
router.post("/addHabit",habitController.addHabit);
router.post("/executeHabit/:habitID",habitController.executeHabit);
router.get("/detailView",habitController.detailView);
router.post("/updateStatus",habitController.updateStatus)
module.exports=router;