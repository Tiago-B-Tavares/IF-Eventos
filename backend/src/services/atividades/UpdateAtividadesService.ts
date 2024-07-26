
import prismaClient from "../../prisma";

interface UpdateAtividadeRequest {
    id:string;
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
class UpdateAtividadesService {
    async execute({ id, local, horario, ch, concomitante, nome, descricao, vagas, banner, evento_id }: UpdateAtividadeRequest) {
        try {
            const updadeAtividade = await prismaClient.atividade.update({
                where: {
                    id: id
                },
                data: {

                    local,
                    horario,
                    ch,
                    concomitante,
                    nome,
                    descricao,
                    vagas ,
                    banner,
                    evento_id

                }
            })
            return updadeAtividade
        } catch (error) {
            return { message: `Não foi possível atualizar essa atividade devido ao erro: ${error} `}
        }
    }
}
export { UpdateAtividadesService }