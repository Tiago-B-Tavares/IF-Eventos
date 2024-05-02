import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    data: string;
    horario: string;
    local: string;
    organizador_id: string;
}
class UpdateEventoService {
    async execute({ id, data, horario, local, organizador_id }: UpdateEventoRequest) {

        const updadeEvento = await prismaClient.evento.update({
            where: {
                id: id
            },
            data: {
                data: data,
                horario: horario,
                local: local,
                organizador_id: organizador_id
            }
        })

    }
}
export { UpdateEventoService }