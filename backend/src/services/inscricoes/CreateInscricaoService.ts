import prismaClient from "../../prisma";

interface inscricacaoRequest {
    atividade_id: string;
    participante_id: string;
}
class CreateInscricaoService {
    async execute({ atividade_id, participante_id }: inscricacaoRequest) {
        try {
            const participanteAlreadExists = await prismaClient.inscricao.findFirst({
                where: {
                    participante_id: participante_id
                }
            })

            let checkAtividade = await prismaClient.atividade.findFirst({

                where: {
                    id: atividade_id
                }
            
            })
            
            if (participanteAlreadExists) {

                throw new Error("Usuario já está perticipando");


            } else if( checkAtividade.vagas > 0){
               
                const inscricao = await prismaClient.inscricao.create({

                    data: {

                        atividade_id: atividade_id,
                        participante_id: participante_id
                    },

                    select: {
                        id: true,
                        atividade_id: true,
                        participante_id: true,
                        createdAt: true,
                        updatedAt: true
                    }

                })
                
               
              
                const UpdateVagasAtividade = await prismaClient.atividade.update({
                    where: {
                        id: atividade_id
                    },

                    data:{
                        vagas:{
                            decrement:1
                        }
                    }
                
                })

                return inscricao;
            }else{
                throw new Error("Não há vagas para esta atividade");
                
            }



        } catch (error) {
            return { message: `${error}` };
        }
    }

}
export { CreateInscricaoService }