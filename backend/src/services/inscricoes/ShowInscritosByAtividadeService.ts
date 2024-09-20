import prismaClient from "../../prisma";

interface showInscritosRequest {

    atividade_id: string;

}
class ShowInscritosByAtividadeService {
    async execute({ atividade_id }) {
        
        try {

            const inscritosList = await prismaClient.inscricao.findMany({
                where: {
                    atividade_id:atividade_id
                },
                include: {
                    
                    participante: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            idade: true,
                            sexo: true,
                            _count:true

                        },
                    },
                },
            });
            if (!inscritosList) {
                return "Não há inscritos nessa atividade!"
            } else {
                return inscritosList;
                    
            }


        } catch (error) {
            console.log(error);
            return `erro ao listar inscritos: ${error}`
           
            
        }
    }
}
export { ShowInscritosByAtividadeService }