const express=require("express");
const app=express();
const port =3000;
const expressejslayouts=require("express-ejs-layouts");
const cookieParser=require("cookie-parser");
const db=require("./config/mongoose");

app.set("view engine","ejs");//set the ejs as view engine
app.set("views","./views");//set the views folder location
app.use(expressejslayouts);//use express-ejs-layouts
app.use(cookieParser());
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.use(express.urlencoded({require:false}));

app.use(express.static("./assets"));//setting the static file location



app.use("/",require("./routers"));//set thr router path
app.listen(port,(err)=>{
    if(err){
        console.log("error in starting server")
    }
    console.log("The Server is Up and Running on Port",port);
})