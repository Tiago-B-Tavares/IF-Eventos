import prismaClient from "../../prisma";

interface CreateEventoRequest {
    nome:string
    data: string;
    horario: string;
    local: string;
    organizador_id: string;

}

class CreateEventoService {
    async execute({ nome, data, horario, local, organizador_id }: CreateEventoRequest) {

        try {
            const evento = await prismaClient.evento.create({
                data: {
                    nome:nome,
                    data: data,
                    horario: horario,
                    local: local,
                    organizador_id: organizador_id
                },
                select: {
                    nome:true,
                    data: true,
                    horario: true,
                    local: true
                }
            })

            return evento;

        } catch (error) {
            return { message: `Não foi possível cadastrar Evento devido ao erro: ${error} ` }
        }
    }
}
export { CreateEventoService }