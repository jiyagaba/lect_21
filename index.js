const express=require("express");
const path=require("path");
const app=express();
const multer= require("multer");
const db=require("./db.json")
const fs=require("fs");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

const fileUpload=multer({dest:"uploads/"});

app.use(express.urlencoded({extended:false}))

app.use("/user",userRouter);
app.use("/product",productRouter);
app.get("/",(req,res)=>{
    res.sendFile("post.html",{root:path.join(__dirname)});
    // res.send("this is get route");
})

app.post("/post",fileUpload.single("file"),(req,res)=>{
    let file=req.file;
    let {name,email,password}=req.body;
    res.send({name,email,password,file});
})
const port=2345;
app.listen(port,(err)=>
{
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log(`Server is runing on port:${port}`);
    }
})