import express from "express";
import mongoose from "mongoose";



const app=express()

mongoose.connection('mongodb://127.0.0.1:27017/companySpace').then(()=>{
    console.log("mongodb is successfully connected")
}).catch(()=>{
    console.error("something went wrong with mongodb ")
})

app.listen(3000,()=>{
    console.log("http://localhost:3000")
})
