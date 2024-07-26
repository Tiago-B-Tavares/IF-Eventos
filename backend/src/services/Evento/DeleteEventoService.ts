import prismaClient from "../../prisma";

interface deleteEventoRequest {
    id: string;
}

class DeleteEventoService {
    async execute({ id }: deleteEventoRequest) {
        console.log(id);
        
        try {
          
            await prismaClient.evento.delete({
                where: {
                    id: id,
                }
            });

            return { message: "Deletado com sucesso" };

        } catch (error) {
            console.error(error);
            return { message: "Erro ao deletar", error };
        }
    }
}

export { DeleteEventoService };
