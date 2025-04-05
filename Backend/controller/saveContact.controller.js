import prisma from "../DB/db.config.js"

async function saveContact(req,res){
    try {
        const {fullName,email,phoneNumber,subject,message}=req.body
        const savedData=await prisma.contact.create({
            data:{
                fullName:fullName,
                email:email,
                phoneNumber:phoneNumber,
                subject:subject,
                message:message
            }
        })
        if(savedData){
            return res.status(200).json({message:"successfully stored",data:savedData})
        }else{
            return res.status(404).json({message:"something went wrong"})
        }
    } catch (error) {
        console.error("something went wrong please identify the error",error.message)
        return res.json({message:error.message})
    }
}

export default saveContact;