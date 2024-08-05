import prismaClient from "../../prisma";

interface GetUserDataByIdRequest {
    id: string;
}

class GetUserDataByIdService {
    async execute({ id }) {
        try {
            const userData = await prismaClient.organizador.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    email: true,
                    nome: true,
                    role: true,
                    googleId: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            return {userData};
        } catch (error) {
            console.error("Erro ao buscar dados do usuário! ", error)
            throw new Error("Erro ao buscar dados do usuário!");

        }

    }
}
export { GetUserDataByIdService }