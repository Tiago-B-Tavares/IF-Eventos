import prismaClient from "../../prisma";

class DetailWebUSerService {
    async execute(user_id: string) {
       
        const user = await prismaClient.organizador.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true,
                nome: true,
                email: true
            }
        })

        return user; 

    }
}

export { DetailWebUSerService }