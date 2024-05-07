import prismaClient from "../../prisma";

interface deleteEventoRequest {
    id: string;
}
class DeleteEventoService {
    async execute({ id }: deleteEventoRequest) {

        try {
            const deleteEvento = await prismaClient.evento.delete({

                where: {
                    id: id,
                }
            })

            return { message: "Deletado com sucesso" };
            
        } catch(error) {
            return { message: "Erro ao deletar " + error };
        }
    }
}
export { DeleteEventoService }
