import express from 'express';
import { loggedInHr } from '../controller/companySetup.controller.js';
import { isHrLoggedIn } from '../middleware/auth.js';
import { createEmployees, deleteEmployee, deleteJobVacancy, evaluationCriteria, getAllEmployees, getAllJobApplication, getEmployeeById, getJobApplicationById, getJobVacancyById, jobApplication, postJobVacancies, updateEmployesProfile, updateJobVacancy } from '../controller/hr.controllers.js';
const router=express.Router();

router.post("/login",loggedInHr)
router.post("/logout",(req,res)=>{
    res.clearCookie("hrToken")
    res.json({status:true,message:"hr logged out successfully"})
})

router.post("/createEmployees",isHrLoggedIn,createEmployees)
router.post("/updateEmployeesProfile",isHrLoggedIn,updateEmployesProfile)
router.post("/deleteEmployeesProfile",isHrLoggedIn,deleteEmployee)
router.get("/allEmployees",isHrLoggedIn,getAllEmployees)
router.get("/getEmployee/:id",isHrLoggedIn,getEmployeeById)
router.get("/evaluationCriteria/:id",isHrLoggedIn,evaluationCriteria)
router.post("/postJob",isHrLoggedIn,postJobVacancies)
router.get("/getJob/:id",isHrLoggedIn,getJobVacancyById)
router.put("/updateJob/:id",isHrLoggedIn,updateJobVacancy)
router.delete("/deleteJob/:id",isHrLoggedIn,deleteJobVacancy)
router.post("/jobApplication",jobApplication)
router.get("/getJobApplication/:id",isHrLoggedIn,getAllJobApplication)
router.get("/getJobApplicationById/:id",isHrLoggedIn,getJobApplicationById)

export default router;
