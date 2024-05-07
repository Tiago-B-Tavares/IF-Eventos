import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    data: string;
    horario: string;
    local: string;

}
class UpdateEventoService {
    async execute({ id, data, horario, local }: UpdateEventoRequest) {
        try {
            const updadeEvento = await prismaClient.evento.update({
                where: {
                    id: id
                },
                data: {
                    data: data,
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