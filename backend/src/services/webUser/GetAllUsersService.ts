import prismaClient from "../../prisma";


class GetDataUserService {
    async execute() {
        try {
            const userData = await prismaClient.organizador.findMany()
            return userData
        } catch (error) {
            throw new Error("Erro ao buscar dados do usuário");
        }
    }
}
export { GetDataUserService }