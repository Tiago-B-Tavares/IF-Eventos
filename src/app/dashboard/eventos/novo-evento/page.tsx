"use client"
import RegisterEvent from "@/services/events/registerNewEvent";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";

export default function CadastrarEvento() {
    const toast = useToast();
    const { data: session } = useSession();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Prevenir o comportamento padrão de recarregar a página

        if (session?.user?.id) {
            try {
                const formData = new FormData(e.currentTarget);
                const nome = formData.get("nome") as string;
                const dataInicio = formData.get("dataInicio") as string;
                const dataFim = formData.get("dataFim") as string;
                const horario = formData.get("horario") as string;
                const local = formData.get("local") as string;
                const organizador_id = session?.user.id as string;

                const dataCadastro = { nome, dataInicio, dataFim, horario, local, organizador_id };
                
                RegisterEvent(dataCadastro); 

                toast({
                    title: 'Cadastrado com sucesso!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                console.error("Erro ao registrar o evento:", error);
                toast({
                    title: 'Erro ao cadastrar o evento.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: 'Usuário não autenticado.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex items-center rounded-lg bg-white flex-col gap-4 p-6'>
                
                <Heading size='md' colorScheme='gray'>Cadastro de evento</Heading>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Input
                    type="date"
                    placeholder="Data Início"
                    name="dataInicio"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Input
                    type="date"
                    placeholder="Data Fim"
                    name="dataFim"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Input
                    type="time"
                    placeholder="Horário"
                    name="horario"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Input
                    type="text"
                    placeholder="Local"
                    name="local"
                    size="md"
                    focusBorderColor='#7e22ce'
                    required
                />
                <Button
                    backgroundColor='#7e22ce'
                    borderColor='#7e22ce'
                    variant='outline'
                    _hover={{ bg: 'white', color: '#7e22ce' }}
                    color='white'
                    type="submit"
                    mr={3}
                >
                    <FaCheckCircle className="mr-3" /> Salvar
                </Button>
            </form>
        </>
    );
}
