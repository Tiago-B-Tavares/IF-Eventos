import prismaClient from "../../prisma";

interface DeleteEventoRequest {
  id: string;
}

class DeleteEventoService {
  async execute({ id }: DeleteEventoRequest) {
    try {
      const relatedActivities = await prismaClient.atividade.findMany({
        where: {
          evento_id: id,
        },
      });

      if (relatedActivities.length > 0) {
        throw new Error("Não é permitido excluir um evento com atividades! Acesse a aba Atividades e exclua todas as atividades desse evento!");
      }

      const deletedEvento = await prismaClient.evento.delete({
        where: {
          id: id,
        },
      });

      return { message: "Deletado com sucesso" };
    } catch (error) {
      return { error: error.message }; 
    }
  }
}

export { DeleteEventoService };
