import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'

interface WebUserRequest {
    nome: string;
    email: string;
    senha?: string
    googleId?: string
}
class CreateWebUserService {
    async execute({ nome, email, senha, googleId }: WebUserRequest) {
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
                    googleId: googleId
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    googleId: true
                }
            })

            return user;
        } catch (error) {

            console.error("Erro no processo de autenticação:", error);
            throw new Error( error.message);
        }
    }
}
export { CreateWebUserService }