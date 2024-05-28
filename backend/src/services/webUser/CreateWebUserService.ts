import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface WebUserRequest {
    nome: string;
    email: string;
    senha: string
}
class CreateWebUserService {
    async execute({ nome, email, senha }: WebUserRequest) {
        try {
            if (!email) {
                throw new Error("Email vazio!");
            }
            const userAlreadyExists = await prismaClient.organizador.findFirst({
                where: {
                    email: email
                }
            })
            if (userAlreadyExists) {
                throw new Error("Email já existe!");
            }

            const senhaHash = await hash(senha, 8)

            const user = await prismaClient.organizador.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                }
            })

            return user;
        } catch (error) {

            console.error("Erro no processo de autenticação:", error);
            throw new Error(`Não foi possível cadastrar o usuário devido ao erro: ${error.message}`);
        }
    }
}
export { CreateWebUserService }