import prismaClient from "../../prisma";

interface CreateColaboradorRequest {
    nome: string;
    atividade_id: string;
}

class CreateColaboradorService {
    async execute({ nome, atividade_id }: CreateColaboradorRequest) {
        try {
            // Verifica se o colaborador já existe
            const colaboradorExists = await prismaClient.responsavel.findFirst({
                where: { nome }
            });

            // Se o colaborador existir, verifica se ele já está associado à atividade
            if (colaboradorExists) {
                const respAtividade = await prismaClient.atividadeResponsavel.findFirst({
                    where: {
                        responsavel_id: colaboradorExists.id,
                        atividade_id: atividade_id
                    }
                });

                // Se já for responsável pela atividade, lança erro
                if (respAtividade) {
                    throw new Error("Já é responsável por essa atividade.");
                }

                // Se não for, cria a associação
                await prismaClient.atividadeResponsavel.create({
                    data: {
                        atividade_id: atividade_id,
                        responsavel_id: colaboradorExists.id
                    }
                });

            } else {
                // Se o colaborador não existir, cria o colaborador e associa à atividade
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
            }

            return { message: "Colaborador registrado com sucesso!" };

        } catch (error) {
            throw new Error(`Não foi possível adicionar colaborador devido ao erro: ${error.message}`);
        }
    }
}

export { CreateColaboradorService };
