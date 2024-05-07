import prismaClient from "../../prisma";

interface AtividadeRequest {
    local: string;
    horario: string;
    descricao: string;
    vagas: number;
    banner: string;
    evento_id: string;
}

class CreateAtividadeService {
    async execute({ local, horario, descricao, vagas, banner, evento_id}: AtividadeRequest) {
        console.log(evento_id);
        
        const atividade = await prismaClient.atividade.create({
            data: {
                local,
                horario,
                descricao,
                vagas,
                banner,
                evento_id
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
