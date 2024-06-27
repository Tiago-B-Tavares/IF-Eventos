"use client"
import RegisterEvent from "@/services/events/registerNewEvent";
import { Button, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CadastrarEvento() {

    const { data: session } = useSession();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        if (session?.user?.id) {
            try {
                const formData = new FormData(e.currentTarget)
                const nome = formData.get("nome") as string;
                const dataEvento = formData.get("data") as string;
                const horario = formData.get("horario") as string;
                const local = formData.get("local") as string;
                const organizador_id = session?.user.id as string;
                const dataCadastro = { nome, dataEvento, horario, local, organizador_id }
                RegisterEvent(dataCadastro)
            } catch (error) {
                console.error("Erro ao obter lista de Eventos:", error);
            }
        }
    }
    return (
        <>
            <form onSubmit={login} className='flex items-center rounded-lg bg-white flex-col gap-4  p-6'>
                <Input
                    type="text"
                    placeholder="nome"
                    name="nome"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />

                <Input
                    className='outline-purple-700	'
                    type="date"
                    placeholder="data"
                    name="data"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Input
                    className='outline-purple-700	'
                    type="time"
                    placeholder="horario"
                    name="horario"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                
                />
                <Input
                    className='outline-purple-700	'
                    type="text"
                    placeholder="local"
                    name="local"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Button colorScheme='blue' type="submit" mr={3}>
                    Save
                </Button>
            </form>
        </>
    )

}