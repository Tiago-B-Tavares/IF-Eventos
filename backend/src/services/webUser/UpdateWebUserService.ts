import prismaClient from '../../prisma'

interface UpdateWebUserRequest {
    id: string;
    nome: string;
    email: string;
}
class UpdateWebUserService {
    async execute( { id, nome, email }: UpdateWebUserRequest ) {

        const Updateuser = await prismaClient.organizador.update({
            where: {
                id: id,
            },
            data: {
                nome: nome,
                email: email,
            }
        })
        return Updateuser;
    }
}

export { UpdateWebUserService }
