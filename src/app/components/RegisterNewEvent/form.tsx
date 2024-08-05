// "use client"

// import RegisterEvent from "@/services/events/registerNewEvent"
// import { useSession } from "next-auth/react"
// import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

// export default function ManualClose() {

//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const { data } = useSession()

//   async function login(e: React.FormEvent<HTMLFormElement>) {

    

//     const formData = new FormData(e.currentTarget)

//     const nome = formData.get("nome") as string;
//     const dataInicio = formData.get("dataInicio") as string;
//     const dataFim = formData.get("dataFim") as string;

//     const horario = formData.get("horario") as string;
//     const local = formData.get("local") as string;
//     const organizador_id = data?.user.id as string;
//     const dataCadastro = { nome, dataInicio, dataFim, horario, local, organizador_id }
    
   
    
//     RegisterEvent(dataCadastro)

//   }
//   return (
//     <>
//       <Button className="" onClick={onOpen}>Novo evento</Button>

//       <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader className="bg-green-600">Create your account</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody className="bg-green-600" pb={6}>
            
//           </ModalBody>
//           <ModalFooter className="bg-green-600">

//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }