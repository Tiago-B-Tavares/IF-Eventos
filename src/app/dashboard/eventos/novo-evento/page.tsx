"use client"
import RegisterEvent from "@/services/events/registerNewEvent";
import { Button, Heading, Input, useToast} from "@chakra-ui/react";
import { color } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function CadastrarEvento() {
    const toast = useToast();
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
                toast({
                    title: 'Cadastrado com sucesso!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                RegisterEvent(dataCadastro)
            } catch (error) {
                console.error("Erro ao obter lista de Eventos:", error);
            }
        }
    }
    return (
        <>
            <form onSubmit={login} className='flex items-center rounded-lg bg-white flex-col gap-4  p-6'>
            <Heading size='md' colorScheme='gray'> Cadastro de evento</Heading>
                <Input
                    type="text"
                    placeholder="Nome"
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
                    placeholder="Local"
                    name="local"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Button  backgroundColor='#7e22ce' borderColor='#7e22ce' variant='outline' _hover={{ bg: 'white',  color: '#7e22ce' }} color='white' type="submit" mr={3}>
                <FaCheckCircle className="mr-3"/>  Salvar
                </Button>
            </form>
        </>
    )

}