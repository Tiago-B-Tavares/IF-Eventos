import prismaClient from "../../prisma";

interface inscricaoRequest {
    atividade_id: string;
    participante_id: string;
}

class CreateInscricaoService {
    async execute({ atividade_id, participante_id }: inscricaoRequest) {
       

        try {
            // Verifica se o participante já está inscrito
            const participanteAlreadyExists = await prismaClient.inscricao.findFirst({
                where: {
                    participante_id: participante_id
                }
            });

            // Verifica se a atividade existe
            let checkAtividade = await prismaClient.atividade.findFirst({
                where: {
                    id: atividade_id
                }
            });

            if (!checkAtividade) {
                throw new Error("Atividade não encontrada");
            }

            if (participanteAlreadyExists) {
                throw new Error("Usuário já está participando");

            } else if (checkAtividade.vagas > 0) {

               
                    // Cria a inscrição
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
                    });

                    // Atualiza o número de vagas
                    await prismaClient.atividade.update({
                        where: {
                            id: atividade_id
                        },
                        data: {
                            vagas: {
                                decrement: 1
                            }
                        }
                    });


                    return inscricao;

            } else {
                throw new Error("Não há vagas para esta atividade: ");
            }

        } catch (error) {
            return { message: `${error}` };
        }
    }
}

export { CreateInscricaoService };
