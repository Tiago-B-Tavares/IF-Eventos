
import { api } from "@/services/setupApiClient";


export default async function deleteEvent(id:string) {


    try {
        console.log(id);
        
        const response = await api.delete(`/evento?id=${id}`)
        
        const evento = response.data;

        
        return evento;

    } catch (error) {
        throw new Error('Erro ao deletar Evento');
    }
}
   
      
      

