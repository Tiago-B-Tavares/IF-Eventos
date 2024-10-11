"use client";

import React, { useState, useEffect, useRef } from 'react';
import {

    useToast,
    useDisclosure,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading
} from "@chakra-ui/react";
import { PiFileMagnifyingGlassLight } from "react-icons/pi";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import { AtividadesProps, EventoProps } from "@/types/interfaces";
import AddActivity from './components/formCreate';
import BtnEditar from './components/btnEditar';
import BtnExluir from './components/btnExcluir';
import getAllEvents from '@/services/events/getAllEvents';
import NoActivitiesMessage from './components/NoActivitiesMessage';

export default function Atividades() {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState<EventoProps[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<AtividadesProps | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string>();

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [nome, setNome] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [horario, setHorario] = useState<string>("");
    const [concomitante, setConcomitante] = useState<boolean>(false);
    const [ch, setCh] = useState<number>(0);
    const [vagas, setVagas] = useState<number>(0);

    let IsAdmin = false;
    if (session?.user.role === "SUPER_ADMIN") {
        IsAdmin = true;
    }

    useEffect(() => {

        async function fetchEvents() {
            if (session?.user?.id) {
                if (session?.user?.role === "SUPER_ADMIN") {
                    try {
                        const listaEventos = await getAllEvents();
                        setEventos(listaEventos);
                    } catch (error) {
                        console.error("Erro ao obter lista de Eventos:", error);
                    }
                } else {
                    try {
                        const listaEventos = await getEvents(session.user.id);
                        setEventos(listaEventos);
                    } catch (error) {
                        console.error("Erro ao obter lista de Eventos:", error);
                    }
                }
            }
        }
        fetchEvents();
    }, [session, eventos]);



    return (
        <>
            {IsAdmin && (
                <div>
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
                                                        <AccordionButton
                                                            onClick={() => {
                                                                setSelectedEvent(e.id);
                                                                setIsVisible(!isVisible); // Alterna a visibilidade ao clicar
                                                            }}
                                                            className="flex flex-wrap justify-between font-medium border border-green-700 rounded-lg text-green-700"
                                                        >
                                                            <div>{atividade.nome}</div>
                                                            <div className={`flex flex-row gap-4 ${isVisible ? "block" : "hidden"}`}>
                                                                {IsAdmin && (
                                                                    <>
                                                                        {selectedEvent && <AddActivity evento_id={selectedEvent} />}
                                                                        <BtnExluir atividade={atividade} />
                                                                    </>
                                                                )}
                                                                <BtnEditar atividade={atividade} />
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
                                                <div
                                                    className="text-center border border-green-700 rounded-lg text-red-500 text-xl flex justify-center flex-col items-center p-3"
                                                    onClick={() => {
                                                        setSelectedEvent(e.id);
                                                    }}
                                                >
                                                    <PiFileMagnifyingGlassLight className="text-2xl" />
                                                    <p className="font-normal">Este evento ainda não possui atividades</p>
                                                    <b className="text-sm p-2 cursor-pointer">Clique aqui para adicionar</b>

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
            )}
            {!IsAdmin && (
                <NoActivitiesMessage />
            )}
        </>
    );
}
