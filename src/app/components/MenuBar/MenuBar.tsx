
import { WrapItem, Avatar, Link, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react"
import { FaAngleRight, FaRegCalendarPlus } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext } from "react";
import { useSession } from "next-auth/react";




export default function MenuBar() {
 const {data} = useSession()

    const { open } = useContext(MenuContexts);

    return (

        <aside className={`font-sans bg-purple-950  overflow-hidden transition-all    duration-200 ${open ? "w-60 p-4" : "w-0"
            } lg:w-72 lg:p-4 `}>
            {/* <div className="flex flex-col justify-center items-center pb-6">
                <WrapItem>
                <Avatar 
                        name={data?.user?.name ?? "Usuário"} 
                        src={data?.user?.image ?? "https://bit.ly/dan-abramov"} 
                    />
                </WrapItem>
                <span>{data?.user?.name}</span>
            </div> */}


            <div className="mb-6">
                Image
            </div>
            <ul>
                <li className="flex  cursor-pointer font-bold bg-purple-900 shadow-sm shadow-purple-800 text-white justify-start items-center hover:transition-all duration-300 hover:translate-y-1 hover:bg-purple-700 rounded-xl p-2">
                    <GrProjects className="mr-2" />
                    <div className="flex-1">
                        <Menu >
                            <MenuButton className="flex-1 pr-4">Eventos</MenuButton>
                            <Portal>
                                <MenuList >
                                    <MenuItem className="flex justify-start"><FaRegCalendarPlus className="mr-3 text-purple-700"/><Link href="/dashboard/eventos">Novo evento</Link></MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </div>

                    <FaAngleRight />
                </li>

            </ul>
        </aside>
    )

} 