"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import getEvents from "@/services/events/getEvents";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Editable, EditableInput, EditablePreview, Heading, Input, Stack, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { LuCalendarClock } from "react-icons/lu";
import { MdEditDocument, MdPlace, MdAccessTimeFilled } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { EventoProps } from "@/types/interfaces";
import editEvent from "@/services/events/editEvent";
import deleteEvent from "@/services/events/deleteEvent";
import getAllEvents from "@/services/events/getAllEvents";
// import deleteEvent from "@/services/events/deleteEvent"; // Importe a função de excluir evento
// import editEvent from "@/services/events/editEvent"; // Importe a função de editar evento

export default function Eventos() {
  const { data: session } = useSession();
  let [eventos, setEventos] = useState<EventoProps[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventoProps | null>(null);
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    async function fetchEventsAndActivities() {
      if (session?.user?.id) {
        try {
          
          
          if (session.user.role === "SUPER_ADMIN") {
            eventos = await getAllEvents();
          } else {
            eventos = await getEvents(session.user.id);
          }
          
          setEventos(eventos);

        } catch (error) {
          console.error("Erro ao obter lista de Eventos:", error);
        }
      }
    }

    fetchEventsAndActivities();
  }, [session]);


  const handleDeleteEvent = async () => {
    if (selectedEvent) {
      try {

        await deleteEvent(selectedEvent.id as string)
        toast({
          title: "Excluído com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setEventos(prevEventos => prevEventos.filter(evento => evento.id !== selectedEvent.id));
      } catch (error) {
        toast({
          title: "Erro ao excluir!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Erro ao excluir o evento:", error);
      }
    }
  };

  const handleEditEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nome = formData.get("nome") as string;
    const local = formData.get("local") as string;
    const descricao = formData.get("descricao") as string;
    const dataInicio = formData.get("dataInicio") as string;
    const dataFim = formData.get("dataFim") as string;
    const horario = formData.get("horario") as string;
    const id = selectedEvent?.id as string
    const dados = {
      id,
      horario,
      nome, local, descricao, dataInicio, dataFim
    }
    if (selectedEvent) {
      try {

        await editEvent(dados);
        toast({
          title: "Editado com sucesso!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        setEventos(prevEventos =>
          prevEventos.map(evento =>
            evento.id === selectedEvent.id ? { ...evento, nome, local, descricao, dataInicio, dataFim } : evento
          )
        );
      } catch (error) {
        toast({
          title: "Erro ao editar!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Erro ao editar o evento:", error);
      }
    }
  };

  const openModal = (type: 'edit' | 'delete', event: EventoProps) => {
    setSelectedEvent(event);
    setModalType(type);
    onOpen();
  };

  return (
    <>
      {eventos.map((e) => (
        <ul className="bg-gray-300 mx-auto max-w-screen-lg p-4" key={e.id}>
          <li className="flex flex-col justify-start rounded-lg bg-white border border-green-700 m-4">
            <div className="text-base flex gap-2 p-4 flex-col">
              <Heading as='h2' size='lg' className="underline text-green-800 pb-4">
                {e.nome}
              </Heading>
              <div className="text-gray-500 font-medium">
                <p className="text-lg text-green-700">Sobre o evento:</p>
                {e.descricao}
              </div>
              <div className="flex flex-row gap-4">
                <LuCalendarClock className="text-xl text-green-700" />
                <div className="flex flex-row justify-between gap-4 text-green-700">
                  <span><b>De:</b> {e.dataInicio}</span>
                  <span><b>Até:</b> {e.dataFim}</span>
                </div>
                <div className="flex flex-row justify-between items-center gap-4 text-green-700">
                  <MdAccessTimeFilled />
                  <span><b>Horário:</b> {e.horario}</span>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-4">
                <MdPlace className="text-xl text-red-700" />
                <div className="flex flex-row justify-between gap-4 text-green-700">
                  <span>{e.local}</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => openModal('delete', e)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => openModal('edit', e)}
                  >
                    <MdEditDocument />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}

      {/* Modal de Exclusão */}
      {modalType === 'delete' && selectedEvent && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Excluir Evento
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleDeleteEvent}
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
      {modalType === 'edit' && selectedEvent && (
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Editar Evento
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <form onSubmit={handleEditEvent} encType="multipart/form-data">


                  <Stack spacing={3} className="border-1 border-green-700">
                    <label>Nome: </label>
                    <Input variant='outline' placeholder={selectedEvent.nome} name='nome' />
                    <label>Local: </label>
                    <Input variant='outline' placeholder={selectedEvent.local} name='local' />
                    <label>Horário: </label>
                    <Input variant='outline' type="time" placeholder={selectedEvent.horario} name='horario' />
                    <label>Descrição : </label>
                    <Textarea variant='outline' placeholder={selectedEvent.descricao} name='descricao' />
                    <label>Início: </label>
                    <Input type='date' placeholder={selectedEvent.dataInicio} name='dataInicio' />
                    <label>Término: </label>
                    <Input type='date' placeholder={selectedEvent.dataFim} name='dataFim' />
                  </Stack>
                  <div className=" pt-3 flex justify-between">
                    <Button ref={cancelRef} onClick={onClose}>Cancelar</Button>
                    <Button colorScheme="blue" ml={3} type='submit'>
                      Editar
                    </Button>
                  </div>

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


