import express from "express";
import { addHr, loginAdmin, registerAdmin } from "../controller/companySetup.controller.js";
import verifyToken from "../middleware/authMiddleware.js";
import { isAdminLoggedIn, loggedInUsers } from "../middleware/auth.js";

const router=express.Router()

router.post('/createAdmin',loggedInUsers,registerAdmin)
router.post('/adminLogin',loggedInUsers,loginAdmin)
router.post("/adminLogout",loggedInUsers,(req,res)=>{
    res.clearCookie("adminToken")
    res.json({status:true,message:"admin logged out successfully"})
})
router.post("/addHr",loggedInUsers,isAdminLoggedIn,addHr)
export default router