import prismaClient from "../../prisma";

interface CountEventosRequest {
    id: string;
}

class CountEventosService {
    async execute({ id }: CountEventosRequest) {
        try {
            const listEventos = await prismaClient.evento.count({
                where: {
                    organizadores: {
                        some: {
                            organizador: {
                                id: id
                            }
                        }
                    }
                },
            });
            return listEventos;
        } catch (error) {
            return { message: `Não foi possível contar os Eventos devido ao erro: ${error}` };
        }
    }
}

export { CountEventosService };
