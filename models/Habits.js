const mongoose = require("mongoose");

const habitSchema= mongoose.Schema({
    habitName:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users",
    },
    dateAndStatus:[{
        date:{
            type:Date,
        },
        status:{
            type:String,
            default:"NOT_TAKEN"
        }
    }]
},{timeStamps:true});

const Habits=mongoose.model("Habits",habitSchema);
module.exports=Habits;