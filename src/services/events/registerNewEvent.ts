
import { api } from "../setupApiClient";

interface registerEventsProps {
    nome: string;
    dataEvento: string;
    horario: string;
    local: string;
    organizador_id: string;
}

export default function RegisterEvent({ nome, dataEvento, horario, local, organizador_id }: registerEventsProps) {
 
    api.post("/eventos", {
        nome:nome, 
        data: dataEvento, 
        horario:horario, 
        local: local,
        organizador_id: organizador_id
    })
        .then(response => {
            
        console.log("deu bom no cadastro");
            
        })
        .catch(error => {
            console.log("erro ao cadastrar evento");

        });
}