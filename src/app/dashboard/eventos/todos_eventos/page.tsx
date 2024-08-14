"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import getActivities from "@/services/activities/getActivities";
import deleteActivity from "@/services/activities/deleteActivity";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    CardBody,
    Button,
    Card,
    CardFooter,
    Heading,
    Stack,
    useToast,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay
} from "@chakra-ui/react";

interface OrganizadorProps {
    nome: string;
  }
  
  interface ResponsavelProps {
    nome: string;
  }
  
  interface AtividadeProps {
    id: string;
    nome: string;
    horario: string;
    descricao: string;
    responsaveis: {
      responsavel: ResponsavelProps;
    }[];
  }
  
  interface EventoProps {
    id:string;
    nome: string;
    horario: string;
    dataInicio: string;
    dataFim: string;
    local: string;
    _count: {
      atividades: number;
      organizadores: number;
    };
    organizadores: {
      organizador: OrganizadorProps;
    }[];
    atividades: AtividadeProps[];
  }
  


export default function Eventos() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);
    const [atividades, setAtividades] = useState<{ [key: string]: AtividadeProps[] }>({});
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [selectedActivity, setSelectedActivity] = useState<{ activityId: string, eventId: string } | null>(null);


    useEffect(() => {
        async function fetchEventsAndActivities() {
            if (session?.user?.id) {
                try {
                    const events = await getEvents(session.user.id);

                    setEventos(events);
                    //retorna um objeto contendo o id do evento e a lista de atividades
                    const activitiesPromises = events.map(async (evento: { id: string; }) => {
                        const activities = await getActivities(evento.id);
                        return { eventId: evento.id, activities };
                    });

                    const activitiesArray = await Promise.all(activitiesPromises);

                    const activitiesObject: { [key: string]: AtividadeProps[] } = {};
                    activitiesArray.forEach(({ eventId, activities }) => {
                        activitiesObject[eventId] = activities;
                    });

                    setAtividades(activitiesObject);
                } catch (error) {
                    console.error("Erro ao obter lista de Eventos:", error);
                }
            }
        }

        fetchEventsAndActivities();
    }, [session]);

 
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
        <div>
            {eventos.length > 0 ? (
                <div>
                    <h1>Lista de Eventos</h1>
                    <ul>
                        {eventos.map((evento) => (
                            <li key={evento.id} className="pb-4 text-lg ">
                                <Accordion allowMultiple className="bg-white rounded-lg border border-gray-300">
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box className="text-lg" as='span' flex='1' textAlign='left'>
                                                    <Heading size='md'>{evento.nome}</Heading>
                                                    
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        
                                    </AccordionItem>
                                </Accordion>
                            </li>
                        ))}
                    </ul>

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
            ) : (
                <div className="flex justify-center items-center font-semibold text-purple-700">
                    Nenhum evento cadastrado!
                </div>
            )}
        </div>
    );
}
