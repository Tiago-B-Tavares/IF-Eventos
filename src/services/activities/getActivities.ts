
import { api } from "@/services/setupApiClient";


export default async function getActivities(id:string) {

    try {

        const response = await api.get(`/evento/atividades?evento_id=${id}`)

        const listEvents = response.data;
    console.log(listEvents);

        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
      
      

