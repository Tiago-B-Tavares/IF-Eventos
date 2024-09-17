
import { api } from "@/services/setupApiClient";


export default async function deleteEvent(id:string) {


    try {
        
        const response = await api.delete(`/evento?id=${id}`)
        
        const activity = response.data;
        console.log(response.data);
        
        return activity;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
      
      

