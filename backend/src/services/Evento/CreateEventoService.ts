import prismaClient from "../../prisma";

interface CreateEventoRequest {
    nome: string;
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
                    nome,
                    data,
                    horario,
                    local,
                    organizadores: {
                        create: {
                            organizador: {
                                connect: { id: organizador_id },
                            },
                        },
                    },
                },
                include: {
                    organizadores: {
                        include: {
                            organizador: true,
                        },
                    },
                },
            });

            const eventoResponse = {
                id: evento.id,
                nome: evento.nome,
                data: evento.data,
                horario: evento.horario,
                local: evento.local,
                organizadores: evento.organizadores.map(org => ({
                    id: org.organizador.id,
                    nome: org.organizador.nome,
                })),
            };

            return eventoResponse;
        } catch (error) {
            return { message: `Não foi possível cadastrar Evento devido ao erro: ${error.message}` };
        }
    }
}

export { CreateEventoService };
