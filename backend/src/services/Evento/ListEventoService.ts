import prismaClient from "../../prisma";

interface TypesEvent {
    id: string;
}

class ListEventoService {
    async execute({ id }: TypesEvent) {
        try {
            const listEventos = await prismaClient.evento.findMany({
                where: {
                    organizadores: {
                        some: {
                            organizador: {
                                id: id
                            }
                        }
                    }
                },
                include: {
                    organizadores: true, // Inclui informações do organizador, caso seja necessário
                },
            });
            return listEventos;
        } catch (error) {
            return { message: `Não foi possível listar os Eventos devido ao erro: ${error}` };
        }
    }
}

export { ListEventoService };
