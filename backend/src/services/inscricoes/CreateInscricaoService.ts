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
            if (participanteAlreadExists) {

                return "Já está inscrito!!"

            } else {

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
                        updatedAt:true
                    }

                })

                return inscricao;
            }



        } catch (error) {
            return { message: `erro ao se inscrever: ${error}` };
        }
    }

}
export { CreateInscricaoService }