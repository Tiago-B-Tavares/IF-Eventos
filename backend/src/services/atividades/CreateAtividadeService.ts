import prismaClient from '../../prisma';


interface AtividadeRequest {
    nome: string;
    responsavel: string;
    colaboradores: string[];
    descricao: string;
    local: string;
    horario: string;
    vagas: number;
    ch: number;
    concomitante: boolean;
    banner: string;
    evento_id: string;
}

class CreateAtividadeService {
    async execute({ nome, responsavel, colaboradores, descricao, local, horario, vagas, ch, concomitante, banner, evento_id }: AtividadeRequest) {
        try {
            const atividade = await prismaClient.atividade.create({
                data: {
                    nome,
                    responsavel,
                    colaboradores,
                    descricao,
                    local,
                    horario,
                    vagas: Number(vagas),
                    ch: Number(ch),
                    concomitante: Boolean(concomitante),
                    banner,
                    evento_id
                },
                select: {
                    id: true,
                    nome: true,
                }
            });
            return atividade;
        } catch (error) {
            console.error("Erro no processo de criação da atividade:", error);
            throw new Error(`Não foi possível cadastrar atividade devido ao erro: ${error.message}`);
        }
    }
}

export { CreateAtividadeService };