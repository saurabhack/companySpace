import { getUser } from "../service/auth.service.js"

export async function loggedInUsers(req,res,next) {
    const token=req.cookies.token
    console.log(token)
    if(!token){
        return res.json({status:false , message:"please login or register your company "})
    }
    const user=getUser(token.id)
    if(!user){
        return res.json({status:false,message:"please loggin or register your company"})
    }
    req.user=user
    next()
}