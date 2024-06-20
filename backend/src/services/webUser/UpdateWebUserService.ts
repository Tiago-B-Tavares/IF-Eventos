import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface UpdateWebUserRequest {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    googleId?: string;
}
class UpdateWebUserService {
    async execute({ id, nome, email, senha, googleId }: UpdateWebUserRequest) {

        try {
            const senhaHash = await hash(senha, 8)
            await prismaClient.organizador.update({
                where: {
                    id: id,
                },
                data: {
                    nome: nome,
                    email: email,
                    senha:senhaHash,
                    googleId:googleId
                }
            })
        } catch (error) {
            return { message: `Não foi possível atualizar ados do usuário devido ao erro: ${error} ` }
        }
    }
}

export { UpdateWebUserService }
