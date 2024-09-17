
import { api } from "@/services/setupApiClient";


export default async function getEvents(organizador_id: string) {

    try {

        const response = await api.get(`/eventos?id=${organizador_id}`)

        const listEvents = response.data;
console.log(listEvents);


        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

