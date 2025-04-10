import prisma from "../DB/db.config"

export async function createEmployees(req,res){
    const {name,email,role,designation,department}=req.body
    const token=req.cookies.htToken
    const tokenInfo=await decodeToken(token)
    const isEmployee=await prisma.employees.findFirst({
        where:{
            email:email,
            role:role,
            company_id:tokenInfo.compony_id,
        }
    })
    if(isEmployee){
        return res.status(409).json({status:false,message:"employee already exists"})
    }
    const employee=await prisma.employees.create({
        data:{
            name:name,
            email:email,
            role:role,
            designation:designation,
            department:department,
            company_id:tokenInfo.company_id,
        }
    })
    if(!employee){
        return res.status(500).json({status:false,message:"failed to create employee"})
    }
    return res.status(201).json({status:true,message:"employee created successfully",data:employee})
}

