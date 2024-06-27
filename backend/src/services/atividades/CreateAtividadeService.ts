import prismaClient from "../../prisma";

interface AtividadeRequest {
    local: string;
    horario: string;
    nome: string;
    descricao: string;
    vagas: string;
    banner: string;
    evento_id: string;
}

class CreateAtividadeService {
    async execute({ local, horario, nome, descricao, vagas, banner, evento_id }: AtividadeRequest) {
        try {
            const atividade = await prismaClient.atividade.create({
                data: {
                    local,
                    horario,
                    nome,
                    descricao,
                    vagas,
                    banner,
                    evento_id
                },
                select: {
                    local: true,
                    horario: true,
                    nome:true,
                    descricao: true,
                    vagas: true,
                    banner: true
                }
            });
            return atividade;
        } catch (error) {
            return { message: `Não foi possível cadastrar atividade devido ao erro: ${error} `}
        }
    }
}
export { CreateAtividadeService };
