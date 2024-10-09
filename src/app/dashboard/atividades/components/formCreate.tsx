"use client"
import CreateActivity from "@/services/activities/createActivity";
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Select, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useState } from "react";

export default function AddActivity({ evento_id }: { evento_id: string }) {
    const [nome, setNome] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [horario, setHorario] = useState<string>("");
    const [concomitante, setConcomitante] = useState<boolean>(false);
    const [ch, setCh] = useState<number>(0);
    const [vagas, setVagas] = useState<number>(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session } = useSession();

    const organizador_id = session?.user.id

    const handleCreateActivity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();  // Previna comportamento padrão
        try {
            if (!evento_id) {
                console.log("Não tem evento id");
                return;
            }
            await CreateActivity({ nome, horario, local, descricao, vagas, concomitante, ch, evento_id, organizador_id});
            onClose();  // Fechar o modal ao concluir a operação
        } catch (error) {
            console.log("Erro ao criar atividade:", error);
        }
    };

    return (
        <>
            <Button onClick={onOpen}>Adicionar Atividade</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Nova Atividade</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form id="edit-form" onSubmit={handleCreateActivity}>
                            <Stack spacing={3}>
                                <label htmlFor="nome">Nome da Atividade</label>
                                <Input
                                    id="nome"
                                    placeholder="Nome da Atividade"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                                <label htmlFor="local">Local</label>
                                <Input
                                    id="local"
                                    placeholder="Local"
                                    value={local}
                                    onChange={(e) => setLocal(e.target.value)}
                                />
                                <label htmlFor="descricao">Descrição</label>
                                <Input
                                    id="descricao"
                                    placeholder="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                                <label htmlFor="horario">Horário</label>
                                <Input
                                    id="horario"
                                    type="time"
                                    value={horario}
                                    onChange={(e) => setHorario(e.target.value)}
                                />
                                <label htmlFor="concomitante">Concomitante</label>
                                <Select
                                    id="concomitante"
                                    value={concomitante ? "Sim" : "Não"}
                                    onChange={(e) => setConcomitante(e.target.value === "Sim")}
                                >
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </Select>
                                <label htmlFor="ch">Carga Horária</label>
                                <Input
                                    id="ch"
                                    type="number"
                                    placeholder="Carga Horária"
                                    value={ch}
                                    onChange={(e) => setCh(Number(e.target.value))}
                                />
                                <label htmlFor="vagas">Vagas</label>
                                <Input
                                    id="vagas"
                                    type="number"
                                    placeholder="Vagas"
                                    value={vagas}
                                    onChange={(e) => setVagas(Number(e.target.value))}
                                />
                            </Stack>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button form="edit-form" colorScheme='blue' mr={3} type="submit">
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}



{/* <Button onClick={onOpen} className='flex items-center  font-semibold flex-col text-gray-400 text-sm mt-4 p-2 border-2 rounded-lg hover:bg-gray-400 hover:text-white cursor-pointer'>
                <IoMdAddCircle className='' />

            </Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form  id="edit-form" onSubmit={handleCreateActivity}>
                            <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                                <label htmlFor="nome">Nome da Atividade</label>
                                <Input
                                    id="nome"
                                    placeholder="Nome da Atividade"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="border border-gray-300 rounded-md" 
                                />
                                <label htmlFor="local">Local</label>
                                <Input
                                    id="local"
                                    placeholder="Local"
                                    value={local}
                                    onChange={(e) => setLocal(e.target.value)}
                                    className="border border-gray-300 rounded-md" 
                                />
                                <label htmlFor="descricao">Descrição</label>
                                <Input
                                    id="descricao"
                                    placeholder="Descrição"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="border border-gray-300 rounded-md" 
                                />
                                <label htmlFor="horario">Horário</label>
                                <Input
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
                                    placeholder="Concomitante"
                                    value={concomitante ? "Sim" : "Não"}
                                    onChange={(e) => setConcomitante(e.target.value === "Sim")}
                                    className="border border-gray-300 rounded-md" 
                                >
                                    <option value="Sim">Sim</option>
                                    <option value="Não">Não</option>
                                </Select>
                                <label htmlFor="ch">Carga Horária</label>
                                <Input
                                    id="ch"
                                    type="number"
                                    placeholder="Carga Horária"
                                    value={ch}
                                    onChange={(e) => setCh(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md" 
                                />
                                <label htmlFor="vagas">Vagas</label>
                                <Input
                                    id="vagas"
                                    type="number"
                                    placeholder="Vagas"
                                    value={vagas}
                                    onChange={(e) => setVagas(Number(e.target.value))}
                                    className="border border-gray-300 rounded-md" 
                                />
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='blue'>Adicionar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}