import express from "express";
import mongoose from "mongoose";
import router from "./router/contact.router.js";

const app=express()
app.use(express.json())

app.use("/",router)

mongoose.connect('mongodb://127.0.0.1:27017/companySpace').then(()=>{
    console.log("mongodb is successfully connected")
}).catch(()=>{
    console.error("something went wrong with mongodb ")
})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})
