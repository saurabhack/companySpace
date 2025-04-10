import prisma from "../DB/db.config.js";
import decodeToken from "../service/decodeToken.service.js";


export async function loggedInUsers(req, res, next) {
  const token=req.cookies.companytoken
  if(!token){
    console.log("first if condition")
    return res.json({status:false,message:"Please login or register your company"})
  }
  try {
    const tokenInfo=await decodeToken(token)
    console.log("token information",tokenInfo)
    if(tokenInfo.role!="company"){
      return res.json({status:false,message:"unauthorized access"})
    }
    res.json({status:true,message:"company logged in successfully"})
    req.company=tokenInfo
    next()
  } catch (error) {
    console.error("Error in loggedInUsers middleware:", error);
    return res.status(500).json({
      status: false,
      message: "Server error: " + error.message,
    });
}
}

// Middleware: Check if admin is logged in
export async function isAdminLoggedIn(req, res, next) {
  try {
    const token = req.cookies?.adminToken;
    console.log("Admin token from cookie:", token);

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Please login or register as an admin",
      });
    }

    const tokenInfo = await decodeToken(token);
    console.log("Decoded admin token info:", tokenInfo);

    if (!tokenInfo || tokenInfo.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Access denied. Only admins are allowed.",
      });
    }

    req.admin = tokenInfo;
    next();
  } catch (error) {
    console.error("Error in isAdminLoggedIn middleware:", error);
    return res.status(500).json({
      status: false,
      message: "Server error: " + error.message,
    });
  }
}

export async function isHrLoggedIn(req,res,next){

  const token=req.cookies.hrToken
  if(!token){
    console.log("first if condition")
    return res.json({status:false,message:"hr is not logged in"})
  }
  const decodedToken=await decodeToken(token)
  console.log("decoded token",decodedToken)
  if(decodedToken.role!="hr"){
    return res.json({status:false,message:"unauthorized access"})
  }
  res.json({status:true,message:"hr logged in successfully"})
  next()
}