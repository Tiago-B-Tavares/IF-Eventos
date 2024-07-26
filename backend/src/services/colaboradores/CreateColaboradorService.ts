import prismaClient from "../../prisma";



interface CreateColaboradorRequest {
    nome: string;
    atividade_id: string;
}

class CreateColaboradorService {
    async execute({ nome, atividade_id }) {

        try {
            const colaborador = await prismaClient.responsavel.create({
                data: {
                    nome: nome,
                }
            });

            await prismaClient.atividadeResponsavel.create({
                data: {
                    atividade_id: atividade_id,
                    responsavel_id: colaborador.id
                }
            });
            return { message: "Colaborador registrado com sucesso!"}
        } catch (error) {
            throw new Error(`Não foi possível adicionar colaborador devido ao erro: ${error.message}`);
        }
    }
}
export { CreateColaboradorService }