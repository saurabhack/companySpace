import express from "express";
import router from "./router/contact.router.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import authRouter from "./router/auth.router.js";
import companySetupRouter from "./router/companySetup.route.js";
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/",router)
app.use('/auth',authRouter)
app.use('/companySetup',companySetupRouter)
const port=process.env.PORT
app.listen(port,()=>{
    console.log("http://localhost:3000")
})
//7796426783