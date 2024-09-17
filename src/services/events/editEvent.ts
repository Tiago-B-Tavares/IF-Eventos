import { TypesEventsProps } from "@/types/interfaces";
import { api } from "../setupApiClient";

export default async function editEvent({ organizador_id, nome, horario, descricao, local, dataInicio, dataFim }: TypesEventsProps) {


    try {


        const response = await api.put("/evento", {
            organizador_id,
            nome,
            horario,
            descricao,
            local,
            dataInicio,
            dataFim
        });

        console.log("Evento Editado com sucesso", response.data);
        console.log("deu bom");
        return response.data;

    } catch (error) {
        console.error("Erro ao editar evento:", error);
        throw error; // Para capturar o erro corretamente no frontend
    }
}
