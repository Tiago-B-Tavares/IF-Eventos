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
    AlertDialogOverlay,
    Image // Import the Image component
} from "@chakra-ui/react";
import { FaTrashAlt, FaPen } from "react-icons/fa";

interface EventProps {
    id: string;
    nome: string;
    data: string;
    horario: string;
    local: string;
    createdAt: string;
    updatedAt: string;
    organizador_id: string;
}

interface ActivitiesProps {
    id: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: string;
    banner: string; // URL for the image
    eventoId: string;
}

export default function Eventos() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventProps[]>([]);
    const [atividades, setAtividades] = useState<{ [key: string]: ActivitiesProps[] }>({});
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

                    const activitiesPromises = events.map(async (evento: { id: string; }) => {
                        const activities = await getActivities(evento.id);
                        return { eventId: evento.id, activities };
                    });

                    const activitiesArray = await Promise.all(activitiesPromises);

                    const activitiesObject: { [key: string]: ActivitiesProps[] } = {};
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

    if (!session) {
        return <div>Você precisa estar logado para ver os eventos.</div>;
    }

    return (
        <div>
            {eventos.length > 0 ? (
                <div>
                    <h1>Lista de Eventos</h1>
                    <ul>
                        {eventos.map((evento) => (
                            <li key={evento.id} className="pb-4 text-lg">
                                <Accordion allowMultiple className="bg-white rounded-lg">
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box className="text-lg" as='span' flex='1' textAlign='left'>
                                                    <Heading size='lg'> {evento.nome}</Heading>
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            {atividades[evento.id]?.length ? (
                                                <ul className="flex flex-wrap justify-center gap-4">
                                                    {atividades[evento.id].map((atividade) => (
                                                        <li key={atividade.id} className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                                                            <Card
                                                                direction={{ base: 'row', sm: 'row' }}
                                                                overflow='hidden'
                                                                variant='outline'
                                                                className="flex justify-center w-60"
                                                            >
                                                                <Stack >
                                                                    <CardBody  className="w-auto">
                                                                        <div>
                                                                            <Heading size='md'>{atividade.nome}</Heading>
                                                                            <Box>
                                                                                <strong>Local:</strong> {atividade.local}
                                                                            </Box>
                                                                            <Box>
                                                                                <strong>Horário:</strong> {atividade.horario}
                                                                            </Box>
                                                                            <Box>
                                                                                <strong>Vagas:</strong> {atividade.vagas}
                                                                            </Box>
                                                                            <Box>
                                                                                <strong>Descrição:</strong> {atividade.descricao}
                                                                            </Box>
                                                                        </div>

                                                                    </CardBody>
                                                                    <CardFooter className="flex justify-around">
                                                                        <Button leftIcon={<FaTrashAlt />} marginRight={2} colorScheme='red' onClick={() => {
                                                                            setSelectedActivity({ activityId: atividade.id, eventId: evento.id });
                                                                            onOpen();
                                                                        }}>
                                                                            Excluir
                                                                        </Button>
                                                                        <Button leftIcon={<FaPen />}  colorScheme='blue'>
                                                                            Editar
                                                                        </Button>
                                                                    </CardFooter>
                                                                </Stack>
                                                            </Card>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div>Não há atividades para este evento.</div>
                                            )}
                                        </AccordionPanel>
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
                <div>Nenhum evento encontrado.</div>
            )}
        </div>
    );
}
