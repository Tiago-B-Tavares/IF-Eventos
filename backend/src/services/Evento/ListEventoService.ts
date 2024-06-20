import prismaClient from "../../prisma";

interface typesEvent{
    id:string;
}
class ListEventoService {
    async execute({id}:typesEvent) {
        try {
            const listEventos = await prismaClient.evento.findMany({
                where:{
                    organizador_id:id
                }
            })
            return listEventos;
        } catch (error) {
            return { message: `Não foi possível listar os Eventos devido ao erro: ${error} ` }
        }
    }
}
export { ListEventoService }