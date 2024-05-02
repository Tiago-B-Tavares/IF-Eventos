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
    }
}
export { UpdateEventoService }