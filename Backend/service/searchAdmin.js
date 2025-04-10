import prisma from "../DB/db.config.js";

async function searchAdmin(id){
    const admin=await prisma.admin.findFirst({
        where:{
            id:id
        }
    })
    return admin
}

export default searchAdmin