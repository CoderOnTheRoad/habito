const express=require("express");
const app=express();
const port =process.env.PORT||3000; // in this port app will run
require("dotenv").config();
const expressejslayouts=require("express-ejs-layouts");//using express ejs layout to set up a layout of the app
const cookieParser=require("cookie-parser");//requiring cookie parser
const db=require("./config/mongoose");
const Noty = require("noty");
const flash=require("connect-flash");
const customMware=require("./config/connectFlashMiddleware");
const session=require("express-session");
app.set("view engine","ejs");//set the ejs as view engine
app.set("views","./views");//set the views folder location
app.use(expressejslayouts);//use express-ejs-layouts
app.use(cookieParser());
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.use(express.urlencoded({require:false}));

app.use(express.static("./assets"));//setting the static file location
app.use(session({ 
    name:"habito",
    secret:"hush",
    savaUninitialized:true, //when the user is not logged i i dont want to store extra information in session cookie//
    resave:false, //stops saving session cokie saving again and again in browser
    cookie: { maxAge: 60000 }
}));
app.use(flash());
app.use(customMware.flashMessage);
app.use("/",require("./routers"));//set thr router path
app.listen(port,(err)=>{
    if(err){
        console.log("error in starting server")
    }
    console.log("The Server is Up and Running on Port",port);
})