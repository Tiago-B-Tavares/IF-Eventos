import prismaClient from '../../prisma'

interface UpdateWebUserRequest {
    id: string;
    nome: string;
    email: string;
}
class UpdateWebUserService {
    async execute({ id, nome, email }: UpdateWebUserRequest) {
        try {
            await prismaClient.organizador.update({
                where: {
                    id: id,
                },
                data: {
                    nome: nome,
                    email: email,
                }
            })
        } catch (error) {
            return { message: `Não foi possível atualizardados do usuário devido ao erro: ${error} ` }
        }
    }
}

export { UpdateWebUserService }
