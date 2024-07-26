
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    nome
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;

}
class UpdateEventoService {
    async execute({ id, nome, dataInicio, dataFim, horario, local }: UpdateEventoRequest) {
        try {
            const updadeEvento = await prismaClient.evento.update({
                where: {
                    id: id
                },
                data: {
                    nome:nome,
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    horario: horario,
                    local: local,
                }
            })
            return { message: "alterado com susesso!" }
        } catch (error) {
            return { message: `Não foi possível atualizar Evento devido ao erro: ${error} ` }
        }
    }
}
export { UpdateEventoService }