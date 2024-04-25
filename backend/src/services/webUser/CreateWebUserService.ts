import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface WebUserRequest {
    nome: string;
    email: string;
    senha: string
}
class CreateWebUserService {
    async execute({ nome, email, senha }: WebUserRequest) {

        if (!email) {
            throw new Error("Email incorreto!");
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
            select:{
                id: true,
                nome: true,
                email: true,
        }
        })

        return user;
    }
}
export { CreateWebUserService }