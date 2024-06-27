
import { Link, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react"
import { FaAngleRight, FaRegCalendarPlus } from "react-icons/fa";
import { TiThListOutline } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext } from "react";
import { useSession } from "next-auth/react";




export default function MenuBar() {
    const { data } = useSession()

    const { open } = useContext(MenuContexts);

    return (

        <aside className={`font-sans bg-green-950  overflow-hidden transition-all    duration-200 ${open ? "w-60 p-4" : "w-0"
            } lg:w-72 lg:p-4 `}>

            
            <ul className="flex flex-col gap-4">
                <li className="flex  cursor-pointer font-bold bg-green-900 shadow-sm shadow-green-800 text-white justify-start items-center hover:transition-all duration-300 hover:translate-y-1 hover:bg-green-700 rounded-xl p-2">
                    <GrProjects className="mr-2" />
                    <div className="flex-1">
                        <Menu >
                            <MenuButton className="flex-1 pr-24">Eventos</MenuButton>
                            <Portal>
                                <MenuList >
                                    <MenuItem className="flex justify-start p-3 "><FaRegCalendarPlus className="mr-3 text-green-700" /><Link className="decoration-none" href="/dashboard/eventos/novo-evento">Novo evento</Link></MenuItem>
                                    <MenuItem className="flex justify-start p-3"><TiThListOutline className="mr-3 text-green-700" /><Link href="/dashboard/eventos/meus-eventos">Meus eventos</Link></MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </div>
                    <FaAngleRight />
                </li>
                <li className="flex  cursor-pointer font-bold bg-green-900 shadow-sm shadow-green-800 text-white justify-start items-center hover:transition-all duration-300 hover:translate-y-1 hover:bg-green-700 rounded-xl p-2">

                    <div className="flex justify-between items-center">
                        <GrProjects className="mr-2" />
                        <div>Calendário</div>
                    </div>
                </li>
            </ul>
        </aside>
    )

} 