import prismaClient from "../../prisma";

class VerificaAtividadesOrganizadorService {
    async execute(organizador_id: string) {
        try {
            const verifica = await prismaClient.atividadeOrganizador.findMany({
                where: {
                    organizador_id: organizador_id
                }
            })
       
            
        
                return verifica
            

        } catch (erro) {
            console.log(erro);

        }
    }
} export { VerificaAtividadesOrganizadorService }