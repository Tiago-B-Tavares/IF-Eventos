import prismaClient from "../../prisma";

class SearchAllAtividadesService {
  async execute() {
    try {
      const atividades = await prismaClient.atividade.findMany({
        
      include:{
        Evento:true
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
