import express from 'express';
import { loggedInHr } from '../controller/companySetup.controller.js';
import { isHrLoggedIn } from '../middleware/auth.js';
const router=express.Router();

router.post("/login",loggedInHr)
router.post("/logout",(req,res)=>{
    res.clearCookie("hrToken")
    res.json({status:true,message:"hr logged out successfully"})
})

router.post("/createEmployees",isHrLoggedIn)
export default router;
