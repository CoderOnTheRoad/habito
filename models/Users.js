const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    userHabits:[{
        type:String,
    }]
},{timeStamps:true});

const Users=mongoose.model("Users",userSchema);
module.exports=Users;