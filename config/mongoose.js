//configuration of mongoose database

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/habit-tracker");
const db=mongoose.connection;
db.on("err",()=>{console.log("Cant Connect to Database")})
db.once("open",()=>{console.log("Successfuly Connected to Database")});