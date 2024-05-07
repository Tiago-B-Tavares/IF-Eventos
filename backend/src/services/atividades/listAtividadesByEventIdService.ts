import prismaClient from "../../prisma";

interface AtividadeRequest {
  evento_id: string;
}

class SearchAllAtividadesService {
  async execute({ evento_id }: AtividadeRequest) {
    try {
      const atividades = await prismaClient.atividade.findMany({
        where:{
          evento_id:evento_id
        }
      
      });

      return atividades;
    } catch (error) {
      console.log(error);
      throw new Error("Ocorreu um erro ao buscar as atividades \n" + error);
      
    }
  }
}

export { SearchAllAtividadesService };
