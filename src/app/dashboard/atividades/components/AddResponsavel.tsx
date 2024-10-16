"use client";
import { useEffect, useState } from "react";
import { Stack, Select, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box } from "@chakra-ui/react";
import getAllUsers from "@/services/user/getAllUsers";
import { User } from "@/types/interfaces";
import React from "react";
import CreateColab from "@/services/responsible/createColab";

export default function AddResponsavel({ atividade_id }: { atividade_id: string }) {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState(''); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const btnRef = React.useRef(null);

   
    const fetchUsers = async () => {
        try {
            const userList: User[] = await getAllUsers();
            setUsers(userList);
        } catch (error) {
            console.log("Erro ao buscar usuários: ", error);
        }
    };

   
    const adicionarResponsavelAtividade = async () => {
        try {
            if (!selectedUser) {
                console.log("Nenhum usuário selecionado.");
                return;
            }

            const adicionar = await CreateColab({
                atividade_id,
                organizador_id: selectedUser
            });

            console.log("Responsável adicionado com sucesso:", adicionar);
            onClose(); 
        } catch (error) {
            console.log(" ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Button mt={3} ref={btnRef} onClick={onOpen}>
                Adicionar Responsável
            </Button>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Selecione o Responsável</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div>
                            {users.map((user) => (
                                <Box
                                    key={user.id}
                                    p={2}
                                    shadow="md"
                                    borderWidth="1px"
                                    borderRadius="md"
                                    _hover={{ bg: "green.50" }}
                                    onClick={() => setSelectedUser(user.id)} 
                                    bg={selectedUser === user.id ? "green.100" : ""}
                                >
                                    <p className="text-lg cursor-pointer">{user.nome}</p>
                                </Box>
                            ))}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>Cancelar</Button>
                        <Button
                            colorScheme="green"
                            onClick={adicionarResponsavelAtividade} 
                            isDisabled={!selectedUser} 
                        >
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
