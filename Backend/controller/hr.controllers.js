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

export async function updateEmployesProfile(req,res){

    try {
        const {id}=req.params
        const {name,email,role,designation,department}=req.body
        const data=await prisma.employees.update({
            where:{
                id:id,
            },
            data:{
                name:name,
                email:email,
                role:role,
                designation:designation,
                department:department,      
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to update employee"})
        }
        return res.json({sataus:true,message:"employee updated successfully",data:data})

    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to update employee"})
    }
}

export async function deleteEmployee(req,res){
    try {
        const {id}=req.params
        const data=await prisma.employees.delete({
            where:{
                id:id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to delete employee"})
        }
        return res.json({status:true,message:"employee deleted successfully",data:data})
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to delete employee"})
    }
}

export async function getAllEmployees(req,res){
    try {
        const token=req.cookies.htToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.employees.findMany({
            where:{
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch employees"})
        }
        return res.json({status:true,message:"employees fetched successfully",data:data})
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch employees"})
    }
}


export async function getEmployeeById(req,res){
    try{
        const {id}=req.params
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.employees.findFirst({
            where:{
                id:id,
                company_id:tokenInfo.company_id,
            }
        })

        if(!data){
            return res.json({status:false,message:"failed to fetch employee by id"})
        }
        return res.json({status:true,message:"employee fetched successfully",data:data})
    }catch(error){
        console.error("something went wrong",error.message)
        return res.json({status:false,message:"failed to fetch employee by id"})
    }
}

export async function evaluationCriteria(req,res){
    try{
        const {id}=req.params
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.employees.findFirst({
            where:{
                id:id,
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch employee by id"})
        }
        const totalLeaves=data.totalLeaves
        const counterOfCompletedTasks=0
        data.tasks.forEach((task)=>{
            if(task.status==="COMPLETED"){
                counterOfCompletedTasks++
            }
        })
        const leaveLimit=3
        const leaveLimitForYear=36
        const tasksEv=data.tasks.length - counterOfCompletedTasks
        const totalWorkingHours=checkIn -checkOut
        const totalHours=totalWorkingHours/(1000*60*60)
        const totalHoursLimit=24
        if(totalLeaves>leaveLimit || data.tasks.length > tasksEv || totalHoursLimit>totalHours ) {
            const suggestionMessage= "you need to improve your performance if you are not able to improve your performance in the next month we will fire you !!"
            
            return res.json({status:false,message:"Bad performance",suggestionMessage})
        }else if(totalLeaves==leaveLimit || data.tasks.length-5 == tasksEv || totalHoursLimit==totalHours ){
            return res.json({status:true,message:"good performance"})
        }else if(totalLeaves<leaveLimit && data.tasks.length == tasksEv && totalHoursLimit<totalHours ){
            return res.json({status:true,message:"excellence performance"})
        }
    }catch(error){
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch employee by id"})
    }
}


export async function postJobVacancies(req,res){
    try {
        const {title,description,location,experience,skills,salary}=req.body
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const isJobVacancy=await prisma.jobVacancy.findFirst({
            where:{
                title:title,
                company_id:tokenInfo.company_id,
            }
        })
        if(isJobVacancy){
            return res.status(409).json({status:false,message:"job vacancy already exists"})
        }
    
        const jobVacancy=await prisma.jobVacancy.create({
            data:{
                title:title,
                description:description,
                location:location,
                experience:experience,
                skills:skills,
                salary:salary,
                company_id:tokenInfo.company_id,
            }
        })
        if(!jobVacancy){
            return res.status(500).json({status:false,message:"failed to create job vacancy"})   
        }
        return res.status(201).json({status:true,message:"job vacancy created successfully",data:jobVacancy})
    
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch employee by id"})
        
    }
}

export async function getAlljobVacancies(req,res){
    try {
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.jobVacancy.findMany({
            where:{
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch job vacancies"})
        }
        return res.json({status:true,message:"job vacancies fetched successfully",data:data})
    } catch (error) {
     return res.json({status:false,message:"failed to fetch job vacancies"})   
    }
}

export async function getJobVacancyById(req,res){
    try {
        const {id}=req.params
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.jobVacancy.findFirst({
            where:{
                id:id,
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch job vacancy by id"})
        }
        return res.json({status:true,message:"job vacancy fetched successfully",data:data})
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch job vacancy by id"})
    }
}

export async function updateJobVacancy(req,res){
    try {
        const {id}=req.params
        const {title,description,location,experience,skills,salary}=req.body
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.jobVacancy.update({
            where:{
                id:id,
                company_id:tokenInfo.company_id,
            },
            data:{
                title:title,
                description:description,
                location:location,
                experience:experience,
                skills:skills,
                salary:salary,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to update job vacancy"})
        }
        return res.json({status:true,message:"job vacancy updated successfully",data:data})
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to update job vacancy"})
    }
}

export async function deleteJobVacancy(req,res){
    try {
     
    const {id}=req.params
    const token=req.cookies.hrToken
    const tokenInfo=await decodeToken(token)
    const data=await prisma.jobVacancy.delete({
        where:{
            id:id,
            company_id:tokenInfo.company_id,
        }
    })
    if(!data){
        return res.json({status:false,message:"failed to delete job vacancy"})
    }
    return res.json({status:true,message:"job vacancy deleted successfully",data:data})   
    } catch (error) {
        return res.json({status:false,message:"failed to delete job vacancy"})
    }
}

export async function jobApplication(req,res){
    try {
        const {id}=req.params
    const {name,email,phoneNumber,coverLetter,resume}=req.body
    const jobApplication=await prisma.jobApplication.create({
      data:{
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        coverLetter:coverLetter,
        resume:resume,
        jobVacancy_id:id,
      }  
    })
    if(!jobApplication){
        return res.json({status:false,message:"failed to apply for job vacancy"})
    }
    return res.json({status:true,message:"job application submitted successfully",data:jobApplication})     
    } catch (error) {
     console.error(error.message)
     return res.json({status:false,message:"failed to apply for job vacancy"})   
    }   
}

export async function getAllJobApplication(req,res){
    try {
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.jobApplication.findMany({
            where:{
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch job applications"})
        }
        return res.json({status:true,message:"job applications fetched successfully",data:data})
    } catch (error) {
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch job applications"})   
    }
}

export async function getJobApplicationById(req,res){
    try{
        const {id}=req.params
        const token=req.cookies.hrToken
        const tokenInfo=await decodeToken(token)
        const data=await prisma.jobApplication.findFirst({
            where:{
                id:id,
                company_id:tokenInfo.company_id,
            }
        })
        if(!data){
            return res.json({status:false,message:"failed to fetch job application by id"})
        }
        return res.json({status:true,message:"job application fetched successfully",data:data})

    }catch(error){
        console.error(error.message)
        return res.json({status:false,message:"failed to fetch job application by id"})

    }
}
