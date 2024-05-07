import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface AppUserRequest {
    nome: string;
    email: string;
    senha: string
    sexo: string;
    idade:number;
}
class CreateAppUserService {
    async execute({ nome, email, senha, sexo, idade }: AppUserRequest) {
        try {
            if (!email) {
                throw new Error("Email incorreto!");
            }
            const userAlreadyExists = await prismaClient.participante.findFirst({
                where: {
                    email: email
                }
            })
            if (userAlreadyExists) {
                throw new Error("Email já existe!");
            }

            const senhaHash = await hash(senha, 8)

            const user = await prismaClient.participante.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    sexo:sexo,
                    idade:idade
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                }
            })

            return user;
        } catch (error) {

            return { message: `Não foi possível cadastrar usuário devido ao erro: ${error} ` }
        }
    }
}
export { CreateAppUserService }