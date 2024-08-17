"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import getActivities from "@/services/activities/getActivities";
import deleteActivity from "@/services/activities/deleteActivity";
import { MdPlace } from "react-icons/md";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import {



    Button,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,

} from "@chakra-ui/react";
import { log } from "console";

interface EventoProps {
    id: string;
    nome: string;
    dataInicio: string;
    dataFim: string;
    local: string
    banner: string
    atividades: AtividadesProps[]

}
interface ResponsaveisProps {
    nome: string;
}

interface AtividadesProps {
    id: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: string;
    banner: string;
    eventoId: string;
    createdAt: string
    concomitante: boolean;
    responsaveis: ResponsaveisProps[];
    ch: number;
}

export default function Eventos() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);
    const [atividades, setAtividades] = useState<{ [key: string]: AtividadesProps[] }>({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [selectedActivity, setSelectedActivity] = useState<{ activityId: string, eventId: string } | null>(null);


    useEffect(() => {
        async function fetchEventsAndActivities() {
            if (session?.user?.id) {
                try {
                    const listaEventos = await getEvents(session.user.id);
                        console.log(listaEventos);
                        
                    setEventos(listaEventos);


                } catch (error) {
                    console.error("Erro ao obter lista de Eventos:", error);
                }
            }
        }


        fetchEventsAndActivities();
    }, [session]);

    // Handle activity deletion
    const handleDeleteActivity = async () => {
        if (!selectedActivity) return;

        try {
            const { activityId, eventId } = selectedActivity;
            await deleteActivity(activityId);
            setAtividades(prev => ({
                ...prev,
                [eventId]: prev[eventId].filter(activity => activity.id !== activityId)
            }));
            toast({
                title: 'Excluído com sucesso!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: 'Erro ao excluir!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            console.error("Erro ao excluir a atividade:", error);
        }
    };

    return (
        <>
            <div>
                {eventos.map((e) => (
                    <div key={e.id} className="bg-white ">
                        <ul className="bg-slate-200">
                            {e.atividades.map((atividade) => (
                                
                                <li key={atividade.id} className="mb-4 bg-white rounded-lg p-4">
                                    <Accordion defaultIndex={[1]} allowMultiple >
                                        <AccordionItem >
                                            <AccordionButton className="flex flex-wrap ">
                                                <Box as='span' flex='1' textAlign='left' className="flex lg:flex-row sm:flex-col  flex-wrap justify-start items-center">
                                                    <img
                                                        className=" lg:w-1/5 md:1/3 sm:w-full rounded-lg pr-4"
                                                        src={`http://localhost:3333/files/${e.banner}`}
                                                    />
                                                    <div>
                                                        <Heading as='h2' size='md' className=" underline  text-green-800 pb-4">
                                                            {e.nome}
                                                        </Heading>
                                                        <div className=" text-sm flex gap-4 flex-col">
                                                            <div className=" flex flex-row justify-between gap-4">
                                                                <LuCalendarClock className="text-xl text-green-700" />
                                                                <div className="flex flex-row justify-between gap-4 text-green-700">
                                                                    <span className="  "><b>De:</b> {e.dataInicio}</span>
                                                                    <span className=""><b>Até:</b> {e.dataFim}</span>
                                                                </div>
                                                            </div>
                                                            <div className=" flex flex-row justify-start gap-4">
                                                                <MdPlace className="text-xl text-red-700" />
                                                                <div className="flex flex-row justify-between gap-4 text-green-700">
                                                                    <span >{e.local}</span>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>

                                            <AccordionPanel pb={4}>
                                                sda {atividade.local}
                                                <img src={`${atividade.banner}`}alt="" />
                                            
                                                <div>
                                               
                                                {atividade.ch}
                                                {atividade.concomitante}
                                
                                                {atividade.descricao}
                                               
                                                </div>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </Accordion>



                                    <ul>
                                        {atividade.responsaveis.map((responsavel, index) => (
                                            <li key={index}>{responsavel.nome}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>



            <div>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Excluir Atividade
                            </AlertDialogHeader>

                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                Tem certeza que deseja excluir esta atividade? Esta ação não pode ser desfeita.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button colorScheme='red' onClick={handleDeleteActivity} ml={3}>
                                    Excluir
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>
        </>
    )
}
