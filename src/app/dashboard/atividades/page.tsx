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
    Select,
} from "@chakra-ui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { MdEditDocument } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import deleteActivity from "@/services/activities/deleteActivity";
import editActivity from "@/services/activities/editActivity";
import { ActivitiesProps, AtividadesProps, EventoProps } from "@/types/interfaces";
import CreateActivity from '@/services/activities/createActivity';
import AddActivity from './components/formCreate';

export default function Atividades() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<AtividadesProps | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | undefined>();
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);


    const [nome, setNome] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [horario, setHorario] = useState<string>("");
    const [concomitante, setConcomitante] = useState<boolean>(false);
    const [ch, setCh] = useState<number>(0);
    const [vagas, setVagas] = useState<number>(0);

    let canViewEvents = false;
    if (session?.user.role === "SUPER_ADMIN") {
        canViewEvents = true;
    }

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
                // setEventos((prevEventos) =>
                //     prevEventos.map((evento) => ({
                //         ...evento,
                //         atividades: evento.atividades.filter((atividade) => atividade.id !== selectedActivity.id),
                //     }))
                // );
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



        if (selectedActivity) {
            try {
                const updatedActivity: AtividadesProps = {
                    ...selectedActivity,
                    nome,
                    local,
                    descricao,
                    horario,
                    concomitante,
                    ch,
                    vagas,
                };

                const response = await editActivity(updatedActivity);

                console.log(response);

                setEventos((prevEventos) =>
                    prevEventos.map((evento) => {
                        if (evento.id === updatedActivity.eventoId) {
                            return {
                                ...evento,
                                atividades: evento.atividades.map((atividade) =>
                                    atividade.id === updatedActivity.id ? updatedActivity : atividade
                                ),
                            };
                        }
                        return evento;
                    })
                );


                toast({
                    title: "Atividade atualizada com sucesso!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {

                toast({
                    title: "Erro ao atualizar atividade!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };



    const openModal = (type: 'edit' | 'delete', activity: AtividadesProps) => {
        setSelectedActivity(activity);
        setModalType(type);

        if (type === 'edit' && activity) {
            setNome(activity.nome);
            setLocal(activity.local);
            setDescricao(activity.descricao);
            setHorario(activity.horario);
            setConcomitante(activity.concomitante);
            setCh(activity.ch);
            setVagas(Number(activity.vagas));
        }
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
                                                        <div className='flex flex-row gap-4'>
                                                            {canViewEvents && (
                                                                <Button

                                                                    onClick={() => openModal('delete', atividade)}
                                                                >
                                                                    <FaRegTrashAlt className='text-red-700' />
                                                                </Button>
                                                            )}
                                                            <Button

                                                                onClick={() => openModal('edit', atividade)}
                                                            >
                                                                <MdEditDocument className='text-blue-700' />
                                                            </Button>

                                                        </div>
                                                    </AccordionButton>
                                                    <AccordionPanel pb={4} className="bg-slate-100">
                                                        <div>
                                                            <p className="text-green-800">
                                                                <b>Local:</b> {atividade.local}
                                                            </p>
                                                            <p className="text-green-800">
                                                                <b>Horário:</b> {atividade.horario}
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
                                                                <b>Vagas:</b> {atividade.vagas}
                                                            </p>
                                                            <div className="text-green-800">
                                                                <b>Responsáveis:</b>
                                                                <ul>
                                                                    {atividade.responsaveis.map((responsavel, index) => (
                                                                        <li key={index}>{responsavel.responsavel.nome}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        {session?.user.role === "SUPER_ADMIN" ? (
                                            <div className="text-center border border-green-700 rounded-lg text-red-500 text-xl flex justify-center flex-col items-center p-3"
                                                onClick={() => {
                                                    setSelectedEvent(e.id);
                                                }}
                                            >
                                                <PiFileMagnifyingGlassLight className="text-2xl" />
                                                <p className="font-normal">Este evento ainda não possui atividades</p>


                                                {selectedEvent && selectedEvent === e.id && (
                                                    <AddActivity evento_id={selectedEvent} />
                                                )}
                                            </div>

                                        ) : (
                                            <div className="text-center border border-green-700 rounded-lg text-red-500 text-xl flex justify-center flex-col items-center  p-3">
                                                <p className="">Este evento ainda não possui atividades</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

            {/* Modal de Edição e Exclusão */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {modalType === 'edit' ? 'Editar Atividade' : 'Excluir Atividade'}
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />


                        <AlertDialogBody>
                            {modalType === 'edit' ? (
                                <form onSubmit={handleEditActivity} id="edit-form">
                                    <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                        <label htmlFor="nome">Nome da Atividade</label>
                                        <Input
                                            required
                                            id="nome"
                                            placeholder="Nome da Atividade"
                                            value={nome}
                                            onChange={(e) => setNome(e.target.value)}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                        <label htmlFor="local">Local</label>
                                        <Input
                                            required
                                            id="local"
                                            placeholder="Local"
                                            value={local}
                                            onChange={(e) => setLocal(e.target.value)}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                        <label htmlFor="descricao">Descrição</label>
                                        <Input
                                            required
                                            id="descricao"
                                            placeholder="Descrição"
                                            value={descricao}
                                            onChange={(e) => setDescricao(e.target.value)}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                        <label htmlFor="horario">Horário</label>
                                        <Input
                                            required
                                            id="horario"
                                            placeholder="Horário"
                                            value={horario}
                                            type='time'
                                            onChange={(e) => setHorario(e.target.value)}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                        <label htmlFor="concomitante">Concomitante</label>
                                        <Select

                                            id="concomitante"
                                            value={concomitante ? "Sim" : "Não"}
                                            onChange={(e) => setConcomitante(e.target.value === "Sim")}
                                            className="border border-gray-300 rounded-md" 
                                        >
                                            <option value="Sim">Sim</option>
                                            <option value="Não">Não</option>
                                        </Select>
                                        <label htmlFor="ch">Carga Horária</label>
                                        <Input
                                            required
                                            id="ch"
                                            type="number"
                                            placeholder="Carga Horária"
                                            value={ch}
                                            onChange={(e) => setCh(Number(e.target.value))}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                        <label htmlFor="vagas">Vagas</label>
                                        <Input
                                            required
                                            id="vagas"
                                            type="number"
                                            placeholder="Vagas"
                                            value={vagas}
                                            onChange={(e) => setVagas(Number(e.target.value))}
                                            className="border border-gray-300 rounded-md" 
                                        />
                                    </Stack>
                                </form>
                            ) : (
                                <div>
                                    <p>Você tem certeza que deseja excluir a atividade "{selectedActivity?.nome}"?</p>
                                </div>
                            )}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            {modalType === 'edit' ? (
                                <Button colorScheme="blue" type="submit" form="edit-form">
                                    Salvar
                                </Button>
                            ) : (
                                <Button colorScheme="red" onClick={handleDeleteActivity}>
                                    Excluir
                                </Button>
                            )}
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
