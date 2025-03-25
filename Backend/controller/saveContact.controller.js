import contactModel from "../models/contact.models.js"

async function saveContact(req,res){
    try {
        const {fullName,email,phoneNumber,subject,message}=req.body
        const savedData=await contactModel.create({fullName,email,phoneNumber,subject,message})
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