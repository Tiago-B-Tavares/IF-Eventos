import prismaClient from "../../prisma";

interface deleteEventoRequest {
    id: string;
    organizador_id: string;
}
class DeleteEventoService {
    async execute({ id, organizador_id }: deleteEventoRequest) {

        try {
            const deleteEvento = await prismaClient.evento.delete({

                where: {
                    id: id,
                    organizador_id: organizador_id
                }
            })

            return { message: "Deletado com sucesso" };
            
        } catch(error) {
            return { message: "Erro ao deletar " + error };
        }
    }
}
export { DeleteEventoService }
