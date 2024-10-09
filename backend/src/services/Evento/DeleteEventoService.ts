import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

interface deleteEventoRequest {
    id: string;
}

class DeleteEventoService {
    async execute({ id }: deleteEventoRequest) {
       console.log(id);
       
        
        try {
         const hasRelatedActivities =  await prismaClient.atividade.findMany({
                where:{
                    evento_id:id
                }
            })


            if(!hasRelatedActivities){
                await prismaClient.evento.delete({
                where: {
                    id: id,
                }
            });

            return { message: "Deletado com sucesso" };
                
            }else{
                throw new Error("Não é permitido excluir um evento com atividades!");
            }
          
            

        } catch (error) {
           return error
          
        }
    }
}

export { DeleteEventoService };
