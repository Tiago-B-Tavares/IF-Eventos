import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GetEvents from "../../../../services/events/getEvents"
import Link from "next/link";
import {Input, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter } from "@chakra-ui/react";

import React from "react";
import Form from "../../../components/formCadastro/form";
export default async function Eventos() {
    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }
    // return (
    //     <div>
    //         <GetEvents />
    //         <div className="border rounded-2xl shadow-2xl">
                
    //         </div>
    //         <Link href="/dashboard/eventos/cadastrarEvento">adssd</Link></div>
    // )
   return(<Form/>)
}