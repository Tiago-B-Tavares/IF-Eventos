"use client";

import React, { useState, useEffect, useRef } from 'react';
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
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Stack,
    Input,
    Textarea,
    Editable,
    EditableInput,
    EditablePreview,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import Image from "next/image";

import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import deleteActivity from "@/services/activities/deleteActivity";
import editActivity from "@/services/activities/editActivity";
import { AtividadesProps, EventoProps } from "@/types/interfaces";


export default function Atividades() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<AtividadesProps | null>(null);
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        async function fetchEvents() {
            if (session?.user?.id) {
                try {
                    const listaEventos = await getEvents(session.user.id);
                    setEventos(listaEventos);
                } catch (error) {
                    console.error("Erro ao obter lista de Eventos:", error);
                }
            }
        }
        fetchEvents();
    }, [session]);

    const handleDeleteActivity = async () => {
        if (selectedActivity) {
            try {
                await deleteActivity(selectedActivity.id);
                toast({
                    title: "Excluído com sucesso!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                onClose();
                setEventos((prevEventos) =>
                    prevEventos.map((evento) => ({
                        ...evento,
                        atividades: evento.atividades.filter((atividade) => atividade.id !== selectedActivity.id),
                    }))
                );
            } catch (error) {
                toast({
                    title: "Erro ao excluir!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                console.error("Erro ao excluir a atividade:", error);
            }
        }
    };

    const handleEditActivity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

     
        const formData = new FormData(e.currentTarget);

        const nome = formData.get("nome") as string;
        const local = formData.get("local") as string;
        const descricao = formData.get("descricao") as string;
        const banner = formData.get("banner") as string;
        const concomitante = formData.get("concomitante") as unknown as boolean;
        const ch = formData.get("ch") as unknown as number;




       
        // if (selectedActivity) {
        //     try {
        //         await editActivity(selectedActivity);
        //         console.log(selectedActivity);

        //         toast({
        //             title: "Alterado com sucesso!",
        //             status: "success",
        //             duration: 5000,
        //             isClosable: true,
        //         });
        //         onClose();
        //         setEventos((prevEventos) =>
        //             prevEventos.map((evento) => ({
        //                 ...evento,
        //                 atividades: evento.atividades.map((atividade) =>
        //                     atividade.id === selectedActivity.id ? selectedActivity : atividade
        //                 ),
        //             }))
        //         );
        //     } catch (error) {
        //         toast({
        //             title: "Erro ao alterar!",
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //         });
        //         console.error("Erro ao Alterar os dados da atividade:", error);
        //     }
        // }
    };

    const openModal = (type: 'edit' | 'delete', activity: AtividadesProps) => {
        setSelectedActivity(activity);
        setModalType(type);
        onOpen();
    };

    return (
        <>
            <div className="">
                {eventos.map((e) => (
                   
                    <div key={e.id} className="bg-white">
                        <ul className="bg-slate-200">
                            <li className="mb-4 bg-white rounded-lg p-4">
                                <Box
                                    as="span"
                                    flex="1"
                                    textAlign="left"
                                    className="flex lg:flex-row sm:flex-col flex-wrap justify-start items-center h-auto relative"
                                >
                                    <Heading as="h2" size="lg" className="underline text-green-800 pb-4">
                                        {e.nome}
                                    </Heading>
                                </Box>
                                <Heading as="h2" size="sm" className="text-green-800 pb-4">
                                    Atividades:
                                </Heading>

                                {e.atividades.length > 0 ? (
                                    e.atividades.map((atividade) => (
                                        
                                        <div key={atividade.id}>
                                            <Accordion defaultIndex={[1]} allowMultiple className="bg-white rounded-lg mb-2">
                                                <AccordionItem>
                                                    <AccordionButton className="flex flex-wrap justify-between font-medium border border-green-700 rounded-lg text-green-700">
                                                        <div>{atividade.nome}</div>
                                                        <div>
                                                            <Button
                                                                size="sm"
                                                                colorScheme="red"
                                                                onClick={() => openModal('delete', atividade)}
                                                            >
                                                                <FaRegTrashAlt />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                colorScheme="blue"
                                                                onClick={() => openModal('edit', atividade)}
                                                            >
                                                                <MdEditDocument />
                                                            </Button>
                                                        </div>
                                                    </AccordionButton>
                                                    <AccordionPanel pb={4} className="bg-slate-100">
                                                        <div>
                                                           
                                                            <p className="text-green-800">
                                                                <b>Local:</b> {atividade.local}
                                                            </p>
                                                            <p className="text-green-800">
                                                                <b>Carga Horária:</b> {atividade.ch}h
                                                            </p>
                                                            <p className="text-green-800">
                                                                <b>Concomitante:</b> {atividade.concomitante ? "Sim" : "Não"}
                                                            </p>
                                                            <p className="text-green-800">
                                                                <b>Descrição:</b> {atividade.descricao}
                                                            </p>
                                                            <p className="text-green-800">
                                                                <b>Responsáveis:</b>
                                                                <ul>
                                                                    {atividade.responsaveis.map((responsavel, index) => (
                                                                        <li key={index}>{responsavel.responsavel.nome}</li>
                                                                    ))}
                                                                </ul>
                                                            </p>
                                                        </div>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center border border-green-700 rounded-lg text-red-500 text-sm flex justify-center flex-col items-center  p-3">
                                        <PiFileMagnifyingGlassLight className="text-2xl" />
                                        <p className="">Este evento ainda não possui atividades</p>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            {/* Modal de Excluir */}
            {modalType === 'delete' && selectedActivity && (
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
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
                                <Button
                                    colorScheme="red"
                                    onClick={handleDeleteActivity}
                                    ml={3}
                                >
                                    Excluir
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}

            {/* Modal de Edição */}
            {modalType === 'edit' && selectedActivity && (
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Editar Atividade
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                <form onSubmit={handleEditActivity} encType="multipart/form-data">

                                    <input type="file" name="banner" id="" accept=".jpg, .jpeg, .png, .gif" />

                                    <Stack spacing={3}>
                                  
                                        <Editable defaultValue={selectedActivity.nome}>
                                            <EditablePreview />
                                            <EditableInput name='nome' />
                                        </Editable>
                                        <Input variant='outline' placeholder={selectedActivity.local} name='local' />
                                        <Input variant='outline' placeholder={selectedActivity.descricao} name='descricao' />
                                        <Input type='number' placeholder={selectedActivity.ch} name='ch' />
                                    </Stack>
                                    <Button ref={cancelRef} onClick={onClose}> Cancelar
                                    </Button>
                                    <Button
                                        colorScheme="red"

                                        ml={3}
                                        type='submit'
                                    >
                                        Editar
                                    </Button>
                                </form>

                            </AlertDialogBody>
                            <AlertDialogFooter>

                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
}
