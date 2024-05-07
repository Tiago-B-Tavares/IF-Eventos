import prismaClient from "../../prisma";

class ListEventoService {
    async execute() {
        try {
            const listEventos = await prismaClient.evento.findMany()
            return listEventos;
        } catch (error) {
            return { message: `Não foi possível listar os Eventos devido ao erro: ${error} ` }
        }
    }
}
export { ListEventoService }