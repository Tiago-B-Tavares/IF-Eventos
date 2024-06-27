
import { api } from "@/services/setupApiClient";


export default async function getEvents(id: string) {

    try {

        const response = await api.get(`/eventos?id=${id}`)

        const listEvents = response.data;

        return listEvents;

    } catch (error) {
        throw new Error('Erro ao obter lista de Eventos');
    }
}
   
    
      

