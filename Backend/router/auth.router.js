import express from "express";
import { login, logOut, register } from "../controller/auth.controller.js";
const authRouter=express.Router()
authRouter.post('/register',register)
authRouter.post('/login',login)
authRouter.post('/logout',logOut)
export default authRouter