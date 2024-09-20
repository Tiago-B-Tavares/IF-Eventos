import prismaClient from "../../prisma";

interface UpdateAtividadeRequest {
    id: string;
    local: string;
    horario: string;
    ch: number;
    concomitante: boolean;
    nome: string;
    descricao: string;
    vagas: number;
   
}

class UpdateAtividadesService {
    async execute({ id, local, horario, ch, concomitante, nome, descricao, vagas }: UpdateAtividadeRequest) {
        try {
            const atividade = await prismaClient.atividade.updateMany({
                where: {
                    id: id
                },
                data: {
                    local, horario, ch, concomitante, nome, descricao, vagas
                }
            })



            return { message: "deu bom" };

        } catch (error) {
            return { message: `Não foi possível atualizar essa atividade devido ao erro: ${error.message}` };
        }
    }
}

export { UpdateAtividadesService };
