"use client"
import { useEffect, useState } from "react"
import getParticipants from "@/services/participant/getParticipants"

interface ParticipantesProps {
    id: string,
    nome: string,
    email: string,
    idade: number,
    sexo: "M" | "F"
}

export default function Page() {
    const [participantes, setParticipantes] = useState<ParticipantesProps[]>([]); // inicializar como array vazio

    useEffect(() => {
        async function fetchParticipants() {
            try {
                const response = await getParticipants();
                setParticipantes(response); // Atualiza o estado com os participantes
            } catch (error) {
                console.error("Erro ao obter participantes:", error);
            }
        }
        fetchParticipants();
    }, []); // Executa o efeito apenas uma vez ao montar o componente

    return (
        <div>

            {participantes.map((e) => (
                <ul>
                    <li key={e.id}>Nome: {e.nome}</li>
                    <li key={e.id}>Email: {e.email} </li>
                    <li key={e.id}>Idade: {e.idade} anos</li>
                    <li key={e.id}>Sexo: {e.sexo}</li>
                </ul>
            ))}
        </div>
    )
}
