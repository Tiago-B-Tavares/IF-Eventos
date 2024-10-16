import { CreateColabProps } from "@/types/interfaces";
import { api } from "../setupApiClient";


export default async function CreateColab(
    { organizador_id, atividade_id }: CreateColabProps) {
        
    try {


        const response = await api.post("/colaborador", {
           
            organizador_id,
           atividade_id
        });

       
        return response.data;

    } catch (error) {
        throw new Error(" "+ error);
       
    }
}
