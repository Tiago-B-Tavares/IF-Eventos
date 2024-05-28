import prismaClient from "../../prisma";

class DetailWebUSerService {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.organizador.findFirst({
                where: {
                    id: user_id
                },
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            })

            return user;
        } catch (error) {
            throw new Error( `Não foi possível buscar dados do usuário devido ao erro: ${error} `)
        }
    }
}

export { DetailWebUSerService }