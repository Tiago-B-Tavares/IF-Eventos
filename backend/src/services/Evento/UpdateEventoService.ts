import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;

}
class UpdateEventoService {
    async execute({ id, dataInicio, dataFim, horario, local }: UpdateEventoRequest) {
        try {
            const updadeEvento = await prismaClient.evento.update({
                where: {
                    id: id
                },
                data: {
                    dataInicio,
                    dataFim,
                    horario: horario,
                    local: local,
                }
            })
        } catch (error) {
            return { message: `Não foi possível atualizar Evento devido ao erro: ${error} ` }
        }
    }
}
export { UpdateEventoService }