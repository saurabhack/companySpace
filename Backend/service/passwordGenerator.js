import prisma from "../DB/db.config.js";

async function passwordGenerater(companyId, name, role) {
    try {
        console.log("company id ===>", companyId);
        
        const companyInformation = await prisma.company.findFirst({
            where: {
                id: companyId,
            },
        });

        if (!companyInformation || !companyInformation.companyName) {
            throw new Error("Company not found or missing company name");
        }

        const companyName = companyInformation.companyName.toLowerCase();
        const arr = 'abcdefghijklmnopqrstuvwxyz'.split('');

        let companyNameAddition = 0;
        for (let i = 0; i < companyName.length; i++) {
            const index = arr.indexOf(companyName[i]);
            if (index !== -1) {
                companyNameAddition += index;
            }
        }

        let nameAddition = 0;
        const lowerName = name.toLowerCase();
        for (let i = 0; i < lowerName.length; i++) {
            const index = arr.indexOf(lowerName[i]);
            if (index !== -1) {
                nameAddition += index;
            }
        }

        const password = String(companyNameAddition) + String(nameAddition) + role;
        console.log("Generated Password:", password);

        return password;
    } catch (error) {
        console.error("Error generating password:", error.message);
        return null;
    }
}

export default passwordGenerater;
