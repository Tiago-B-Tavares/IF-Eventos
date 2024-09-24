import prismaClient from "../../prisma";


class GetAppUsersService {
    async execute() {


        try {

            const getUsers = await prismaClient.participante.findMany()

         
            return getUsers

        } catch (error) {
            throw new Error(`Erro ao buscar participantes: ${error.message}`);
        }
    }
} export { GetAppUsersService }