import prismaClient from "../../prisma";

interface AtividadeRequest {
    local: string;
    horario: string;
    descricao: string;
    vagas: number;
    banner: string;
    eventoId: string;
}

class CreateAtividadeService {
    async execute({ local, horario, descricao, vagas, banner, eventoId}: AtividadeRequest) {
        const atividade = await prismaClient.atividade.create({
            data: {
                local,
                horario,
                descricao,
                vagas,
                banner,
                eventoId
            },
            select: {
                local: true,
                horario: true,
                descricao: true,
                vagas: true,
                banner: true
            }
        });

        return atividade;
    }
}
export { CreateAtividadeService };
