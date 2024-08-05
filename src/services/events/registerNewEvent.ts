
import { api } from "../setupApiClient";

interface registerEventsProps {
    nome: string;
    dataInicio: string;
    dataFim: string; 
    horario: string;
    local: string;
    organizador_id: string;
}

export default function RegisterEvent({ nome, dataInicio, dataFim, horario, local, organizador_id }: registerEventsProps) {
 
 
    api.post("/eventos", {
        nome:nome, 
        dataInicio: dataInicio, 
        dataFim:dataFim,
        horario:horario, 
        local: local,
        organizador_id: organizador_id
    })
        .then(response => {
            
        console.log(response);
            
        })
        .catch(error => {
            console.log(error);

        });
}