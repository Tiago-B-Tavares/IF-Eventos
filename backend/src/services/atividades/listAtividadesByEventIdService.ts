import prismaClient from "../../prisma";

interface AtividadeRequest {
  evento_id: string;
}
class SearchAllAtividadesService {
  async execute({ evento_id }: AtividadeRequest) {
    try {

      const atividades = await prismaClient.atividade.findMany({
        where: {
          evento_id: evento_id
        }, select: {
          id: true,
          nome: true,
          local: true,
          horario: true,
          descricao: true,
          concomitante: true,
          vagas: true,
          ch: true,
         

          
        },

      });





      return atividades;

    } catch (error) {

      throw new Error("Ocorreu um erro ao buscar as atividades \n" + error);

    }
  }
}

export { SearchAllAtividadesService };
