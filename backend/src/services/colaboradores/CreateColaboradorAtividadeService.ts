import prismaClient from "../../prisma";
interface CreateColaboradorRequest {
    organizador_id: string;
    atividade_id: string;
}

class CreateColaboradorAtividadeService {
    async execute({ organizador_id, atividade_id }: CreateColaboradorRequest) {
        try {
            const organizador = await prismaClient.organizador.findFirst({
                where: { id: organizador_id }
            });

            const organizadorAtividadeAlreadyExists = await prismaClient.atividadeOrganizador.findFirst({
                where: {
                    organizador_id: organizador_id,
                    atividade_id: atividade_id
                }
            });

            if (!organizador) {
                return { message: "Não existe um usuário cadastrado." };
            }

            if (organizadorAtividadeAlreadyExists) {
                return { message: "Este usuário já é responsável por esta atividade!" };
            }

            await prismaClient.atividadeOrganizador.create({
                data: {
                    atividade_id: atividade_id,
                    organizador_id: organizador_id
                }
            });

           
        } catch (error) {
            return { error: true, message: `Não foi possível adicionar colaborador devido ao erro: ${error.message}` };
        }
    }
}

export { CreateColaboradorAtividadeService };
