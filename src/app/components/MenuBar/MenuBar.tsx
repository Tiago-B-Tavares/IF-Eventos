import { FaAngleRight, FaHome } from "react-icons/fa";
import { TiThListOutline } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Link from 'next/link'

export default function MenuBar() {
    const { data: session } = useSession();
    const { open } = useContext(MenuContexts);
    const [selected, setSelected] = useState(false)

    return (
        <aside className={`bg-slate-200 overflow-hidden transition-all h-screen duration-200 ${open ? "w-96 p-2" : "w-0"} lg:w-96 pt-4 pl-4 pb-4`}>
            <div className="p-4 rounded-xl bg-white h-screen overflow-hidden">
                <div className="bg-gray-400 w-full h-16 mb-4 text-center flex justify-center items-center">
                    A LOGO VAI AQUI
                </div>
                <ul className="mb-4 flex flex-col gap-1">
                    <li className="flex px-4 py-4 cursor-pointer font-normal bg-slate-950 shadow-sm text-white justify-start items-center rounded-md">
                        <FaHome className="text-lg mr-4" />
                        <div className="flex-1 font-bold font-sans">
                            Dashboard
                        </div>
                    </li>
                    <li className="flex px-4 py-4 cursor-pointer font-normal bg-white shadow-sm text-slate-500 justify-start items-center hover:transition-all duration-300 hover:translate-y-1 hover:bg-slate-600 hover:text-slate-300 rounded-md">
                        <GrProjects className="mr-4" />
                        <div className="flex-1 font-bold font-sans">
                            Evento
                        </div>
                        <FaAngleRight />
                    </li>
                </ul>
            </div>
        </aside>
    )
}
