const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    userHabits:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Habits",
    }]
},{timeStamps:true});

const Users=mongoose.model("Users",userSchema);
module.exports=Users;