
import { api } from "@/services/setupApiClient";


export default async function deleteActivity(id_activity:string) {

    try {
        
        const response = await api.delete(`/atividades?id=${id_activity}`)
        
        const listEvents = response.data;
        console.log(listEvents);

        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
      
      

