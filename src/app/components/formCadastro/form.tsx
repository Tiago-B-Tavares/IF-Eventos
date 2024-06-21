"use client"


import RegisterEvent from "@/services/events/registerEvent"
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useSession } from "next-auth/react"

export default function ManualClose() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useSession()

  async function login(e: React.FormEvent<HTMLFormElement>) {

    

    const formData = new FormData(e.currentTarget)

    const nome = formData.get("nome") as string;
    const dataEvento = formData.get("data") as string;
    const horario = formData.get("horario") as string;
    const local = formData.get("local") as string;
    const organizador_id = data?.user.id as string;
    const dataCadastro = { nome, dataEvento, horario, local, organizador_id }
    
    console.log(dataCadastro);
    
    RegisterEvent(dataCadastro)

  }
  return (
    <>
      <Button className="" onClick={onOpen}>Novo evento</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-green-600">Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="bg-green-600" pb={6}>
            <form onSubmit={login} className='flex items-center bg-green-600  flex-col gap-4  p-6'>
              <Input
                type="text"
                placeholder="nome"
                name="nome"
                size="md"
                focusBorderColor='#7e22ce'
              />

              <Input
                className='outline-purple-700	'
                type="date"
                placeholder="data"
                name="data"
                size="md"
                focusBorderColor='#7e22ce'

              />
              <Input
                className='outline-purple-700	'
                type="time"
                placeholder="horario"
                name="horario"
                size="md"
                focusBorderColor='#7e22ce'

              />
              <Input
                className='outline-purple-700	'
                type="text"
                placeholder="local"
                name="local"
                size="md"
                focusBorderColor='#7e22ce'
              />
              <Button colorScheme='blue' type="submit" mr={3}>
                Save
              </Button>
            </form>
          </ModalBody>
          <ModalFooter className="bg-green-600">

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}