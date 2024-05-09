import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface updateAppUserRequest{ 
    nome:string;
    email: string;
    senha: string;
    sexo: string;
    idade:number;
}

class UpdateAppUserService{
    async  execute({id, nome, email, senha, sexo, idade }){

        const senhaHash = await hash(senha, 8)
        try {
            const alterUser = prismaClient.participante.update({
                where:{
                    id:id
                },
                data:{
                    nome: nome,
                    email:email,
                    senha:senhaHash,
                    sexo:sexo,
                    idade:idade
                }
            })
            return alterUser
        } catch (error) {
            return { message: `Não foi possível alterar os dados usuário devido ao erro: \n ${error} ` }
        }
        

    }
}
export { UpdateAppUserService }