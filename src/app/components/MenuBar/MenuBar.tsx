import { FaAngleRight, FaHome, FaListAlt } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { MdAddToPhotos } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { TbCertificate } from "react-icons/tb";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { Menu, MenuButton, Portal, MenuList, MenuItem } from "@chakra-ui/react";

export default function MenuBar() {
    const { data: session } = useSession();
    const { open } = useContext(MenuContexts);
    const [selectedItem, setSelectedItem] = useState("dashboard");
    let canViewEvents = false;
    if (session?.user.role === "SUPER_ADMIN") {
        canViewEvents = true
    }


    return (
        <aside className={`bg-gray-300 sm:overflow-hidden transition-all h-screen duration-200   ${open ? "w-96 p-2" : "w-0 p-0 overflow-hidden"} lg:w-96 pt-4 lg:pl-4 sm:ml-0 pb-4 `}>
            <div className="p-4 rounded-xl bg-white h-screen overflow-hidden border border-gray-300">
                <div className="bg-gray-400 w-full h-16 mb-4 text-center flex justify-center items-center">
                    A LOGO VAI AQUI

                </div>
                <ul className="mb-4 flex flex-col gap-2">
                    <li
                        className={`flex px-4 py-4 gap-4 font-normal shadow-sm justify-start items-center rounded-md ${selectedItem === "dashboard" ? "bg-green-900 text-white" : "bg-white text-green-700"}`}
                        onClick={() => setSelectedItem("dashboard")}
                    >
                        <FaHome  />
                        <div className="flex-1 font-bold font-sans cursor-pointer ">
                            <Link href="/dashboard">Início</Link>
                        </div>
                    </li>

                  
                    {canViewEvents && (
                        <li
                            className={`flex px-4 py-4 gap-4 text-md font-normal shadow-sm justify-start items-center rounded-md ${selectedItem === "eventos" ? "bg-green-900 text-white" : "bg-white text-green-700"}`}
                            onClick={() => setSelectedItem("eventos")}
                        >
                            <GrProjects className="text-md" />
                            <div className="flex-1 font-bold font-sans">
                                <Menu>
                                    <MenuButton className="pr-4 cursor-pointer">Eventos</MenuButton>
                                    <Portal>
                                        <MenuList>
                                            <MenuItem className="text-green-700  font-semibold flex gap-2">
                                                <MdAddToPhotos className="text-green-700" />
                                                <Link href="/dashboard/eventos/novo_evento">Novo Evento</Link>
                                            </MenuItem>
                                            <MenuItem className="text-green-700  font-semibold flex gap-2">
                                                <FaListAlt className="text-green-700 " />
                                                <Link href="/dashboard/eventos/todos_eventos">Todos Eventos</Link>
                                            </MenuItem>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </div>
                            <FaAngleRight />
                        </li>
                    )}

                    <li
                        className={`flex px-4 py-4 gap-4 text-md cursor-pointer font-normal shadow-sm justify-start items-center rounded-md ${selectedItem === "atividades" ? "bg-green-900 text-white" : "bg-white text-green-700"}`}
                        onClick={() => setSelectedItem("atividades")}
                    >
                        <TbCertificate className="text-xl" />
                        <div className="flex-1 font-bold font-sans cursor-pointer">
                            <Link href="/dashboard/atividades">Atividades</Link>
                        </div>
                    </li>
                    {canViewEvents && (
                    <li
                        className={`flex px-4 py-4 gap-4 text-md cursor-pointer font-normal shadow-sm justify-start items-center rounded-md ${selectedItem === "participantes" ? "bg-green-900 text-white" : "bg-white text-green-700"}`}
                        onClick={() => setSelectedItem("participantes")}
                    >
                        <TiGroup className="text-xl"/>
                        <div className="flex-1 font-bold font-sans cursor-pointer">
                        <Link href="/dashboard/participantes">Participantes</Link>
                        </div>
                    </li>)}
                    <li
                        className={`flex px-4 py-4 gap-4 text-md cursor-pointer font-normal shadow-sm justify-start items-center rounded-md ${selectedItem === "certificados" ? "bg-green-900 text-white" : "bg-white text-green-700"}`}
                        onClick={() => setSelectedItem("certificados")}
                    >
                        <TbCertificate className="text-xl" />
                        <div className="flex-1 font-bold font-sans cursor-pointer">
                            <Link href="/dashboard/certificados">Certificados</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
