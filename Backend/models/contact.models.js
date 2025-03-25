import mongoose from "mongoose";
const contactSchema=new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    subject:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
})

const contactModel=mongoose.model('contactModel',contactSchema)
export default contactModel