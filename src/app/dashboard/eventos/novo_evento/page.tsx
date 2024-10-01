"use client";

import React, { ChangeEvent, useState } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { RiUploadCloudFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";
import Form from "@/app/components/Forms/genericForm";
import { api } from "@/services/setupApiClient";
import registerNewEvent from "@/services/events/registerNewEvent";

export default function CadastrarEvento() {
    const { data } = useSession();

    const toast = useToast();
    const [nome, setNome] = useState('')
    const [horario, setHorario] = useState('')
    const [descricao, setDescricao] = useState('')
    const [local, setLocal] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const organizador_id = data?.user.id as string

    async function handleRegisterEvent(e: React.FormEvent<HTMLFormElement>) {

        const dados = {
            organizador_id,
            nome,
            horario,
            descricao,
            local,
            dataInicio,
            dataFim
        }

        try {
            await registerNewEvent(dados)



            toast({
                title: "Sucesso",
                description: "Evento cadastrado com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

        } catch (err) {
            console.error("Failed to register event", err);
            toast({
                title: "Erro",
                description: "Falha ao cadastrar o evento.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

    }
    return (
        <>
            <div className=" bg-white p-10 gap-4  rounded-lg">

                <form method="post" encType="multipart/form-data" className="flex flex-col gap-4" onSubmit={handleRegisterEvent}>

                    <label className="text-base font-semibold text-green-800 ">Nome:</label>
                    <input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type='text'

                        onChange={(e) => setNome(e.target.value)} />

                    <label className="text-base font-semibold text-green-800 ">Descriçao:</label>
                    <textarea className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40"
                        onChange={(e) => setDescricao(e.target.value)} />

                    <label className="text-base font-semibold text-green-800 ">Horario:</label>
                    <input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type='time'
                        onChange={(e) => setHorario(e.target.value)}
                    />

                    <label className="text-base font-semibold text-green-800 ">Início:</label>
                    <input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type='date'
                        onChange={(e) => setDataInicio(e.target.value)} />

                    <label className="text-base font-semibold text-green-800 ">Término:</label>
                    <input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type='date'
                        onChange={(e) => setDataFim(e.target.value)} />

                    <label className="text-base font-semibold text-green-800 ">Local:</label>
                    <input className="border-b-2 px-2  border-b-green-800 font-normal text-orange-700 outline-none  placeholder:text-orange-700 placeholder:opacity-40" type='text'
                        onChange={(e) => setLocal(e.target.value)} />

                    <Button type="submit" className="w-40">cadastrar</Button>
                </form>
            </div>
        </>
    );
}
