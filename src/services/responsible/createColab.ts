import { CreateColabProps } from "@/types/interfaces";
import { api } from "../setupApiClient";


export default async function CreateColab(
    { nome, atividade_id }: CreateColabProps) {
        
    try {


        const response = await api.post("/colaborador", {
           
            nome,
           atividade_id
        });

       
        return response.data;

    } catch (error) {
       
    }
}
