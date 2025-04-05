import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../DB/db.config.js"
import { setUser } from "../service/auth.service.js"
export async function register(req,res){
    const {companyName,companyType,companyEmail,password} = req.body
    console.log(req.body)
    console.log("function is calling or not")
    
    if(!companyName || !companyType || !companyEmail || !password){
        console.log("all fields are required !!")
        return res.json({success:false , message:"all fields are required !!"})
    }
    try {
        const isCompany=await prisma.company.findFirst({
            where:{
                companyEmail:companyEmail
            }
        })
        if(isCompany){
            return res.json({status:false,message:"Company already exists . login and try again"})
        }
        console.log(isCompany)
        const hashedPassword=await bcrypt.hash(password,10)
        const newCompany=await prisma.company.create({
            data:{
                companyName:companyName,
                companyEmail:companyEmail,
                companyType:companyType,
                password:hashedPassword
            }
        })
        console.log("request is hitted !! ")
        const token=jwt.sign({id:newCompany.id},process.env.JWT_SECRET,{expiresIn:'7d'})
        setUser(newCompany.id,newCompany)
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true,message:"user is registerd successfully",newCompany})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
} 

export async function login(req,res){
    
    const {companyEmail,password}=req.body
    if(!companyEmail || !password){
        return res.json({success:false,message:"email and password are required"})
    }
    try {
        const isCompany=await prisma.company.findFirst({
            where:{
                companyEmail:companyEmail
            }
        })
        if(!isCompany){
            return res.json({success:false,message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,isCompany.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid password"})
        }
        const token=jwt.sign({id:isCompany.id},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7*24*60*60*1000  
        })
        return res.json({success:true,message:"user is logged in successfully ",isCompany})
    } catch (error) {
        console.error("something went wrong",error.message)
        return res.json({success:false,message:error.message})
    }

}

export async function logOut(req,res){
    try {
         res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ?
            'none':'strict'
        })
        return res.json({status:true , message:"logOut is successfull!!"})
    } catch (error) {
        console.error("something went wrong",error.message)
        return res.json({success:true,message:error.message})
    }
}
