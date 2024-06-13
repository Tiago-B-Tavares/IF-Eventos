"use client"
import { api } from "@/services/setupApiClient";
import { useEffect, useState } from "react";

// Defina o tipo do evento
interface Event {
    id: number;
    nome: string;
}

export default function GetEvents() {
    const [events, setEvents] = useState<Event[]>([]); 

    useEffect(() => {
        api.get("/evento/atividades")
            .then(response => {
                setEvents(response.data);
                console.log('Eventos:', response.data);
            })
            .catch(error => {
                console.error('Erro na requisição (componente getEvents):', error);
            });
    }, []);

    return (
        <ul>
            {events.map((event: Event) => ( 
                <li key={event.id}>{event.nome}aaaaaaaaaa</li>
            ))}
        </ul>
    );
}
