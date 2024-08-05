import getEvents from "@/services/events/getEvents";
import { AddIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Textarea,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import CreateActivity from "@/services/activities/createActivity";

interface ActivitiesProps {
  horario: string;
  nome: string;
  local: string;
  descricao: string;
  vagas: number;
  banner: File;
  evento_id: string;
}

export default function CreateNewActivityDrawer() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.id) {
        const events = await getEvents(session.user.id);
        if (events.length > 0) {
          setEventId(events[0].id); 
        }
      }
    }
    fetchData();
  }, [session]);

  async function handleCreateActivity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (session?.user?.id) {
      try {
        const formData = new FormData(e.currentTarget);

        const data: ActivitiesProps = {
          nome: formData.get("nome") as string,
          local: formData.get("local") as string,
          horario: formData.get("horario") as string,
          vagas: parseInt(formData.get("vagas") as string), // Converte vagas para número
          descricao: formData.get("descricao") as string,
          banner: formData.get("banner") as File,
          evento_id: eventId
        };

       if (data) {
         await CreateActivity(data);
         alert("passou")
       } // Verifique se os dados estão corretos no console

        // Chame a função CreateActivity com os dados corretos
       

        toast({
          title: 'Cadastrado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error: any) {
        console.error(error);
        toast({
          title: 'Erro ao adicionar atividade!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Adicionar
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Adicionar nova atividade
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleCreateActivity}  method="post" encType="multipart/form-data" className="flex items-center flex-col gap-4 py-6 lg:w-64 sm:w-96">
              <Input
                type="text"
                placeholder="Nome"
                name="nome"
                size="md"
                focusBorderColor="#7e22ce"
              />
              <Input
                type="text"
                placeholder="Local"
                name="local"
                size="md"
                focusBorderColor="#7e22ce"
              />
              <Input
                type="time"
                placeholder="Horário"
                name="horario"
                size="md"
                focusBorderColor="#7e22ce"
              />
              <Input
                type="number" 
                placeholder="Vagas"
                name="vagas"
                size="md"
                focusBorderColor="#7e22ce"
              />
              <Textarea
                placeholder="Descreva sua atividade"
                name="descricao"
              />
              <Input
                type="file"
                placeholder="Banner"
                name="banner"
                size="md"
                focusBorderColor="#7e22ce"
              />
              <DrawerFooter>
                <Button className="text-white bg-purple-700 py-2 px-4 rounded-md" type="submit">
                  Criar
                </Button>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancelar
                </Button>
              </DrawerFooter>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
