"use client";
import { MenuContexts } from "@/contexts/MenuContexts";
import { useContext } from "react";
import { FaBars } from "react-icons/fa";

export default function MainHeader() {
    
    const { toggle } = useContext(MenuContexts);

    return (
        <header className="bg-white flex justify-between items-center px-5 h-12">
            <div>brand</div>
            <div onClick={toggle} className="lg:hidden"><FaBars className="cursor-pointer" /></div>
        </header>
    )
}
