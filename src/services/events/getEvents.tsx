"use client"
import { api } from "@/services/setupApiClient";
import { useState } from "react";
import { useSession } from "next-auth/react";


interface Event {
    id: string;
    nome: string;
}

export default function GetEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const { data } = useSession()
    api.get(`/eventos?id=${data?.user.id}`)
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.error('Erro na requisição (componente GetEvents):', error);
        });
    return (
        // separar a busca dos dados 
        <ul>
            {events.map((event: Event) => (
                <li key={event.id}>{event.nome}</li>
            ))}
        </ul>
    );
}
