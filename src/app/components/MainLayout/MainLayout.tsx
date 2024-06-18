"use client";
import { WrapItem, Avatar, Link, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import MainHeader from "../Header/Header";

import { AiOutlineHome } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext } from "react";



type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayoutDashboard({ children }: DashboardLayoutProps) {

    const { open } = useContext(MenuContexts);

    return (

        <div className="bg-gray-200 w-screen min-h-screen">
            <MainHeader />
            <div className=" flex   ">
                <aside className={`bg-white rounded-b-lg overflow-hidden transition-all duration-200 ${open ? "w-60 p-4" : "w-0"
                    } lg:w-60 lg:p-4 `}>
                    <div className="flex justify-center items-center pb-6">
                        <WrapItem>
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        </WrapItem>
                    </div>
                    <ul>
                        <li className="flex justify-start items-center hover:bg-purple-200 hover:text-purple-800 rounded-xl p-2">
                            <AiOutlineHome className="mr-2" />
                            <Link href="/">Home</Link>
                        </li>
                        <li className="flex justify-start items-center hover:bg-purple-200 hover:text-purple-800 rounded-xl p-2">
                            <GrProjects className="mr-2" />
                            <h3 className="flex-1">Projects</h3>
                            <FaAngleRight />
                        </li>
                        <li className="flex justify-start items-center hover:bg-purple-200 hover:text-purple-800 rounded-xl p-2">
                            <GrProjects className="mr-2" />
                            <div className="flex-1">
                                <Menu>
                                    <MenuButton className="flex-1">Open menu</MenuButton>
                                    <Portal>
                                        <MenuList >
                                            <MenuItem>Menu 1</MenuItem>
                                            <MenuItem>New Window</MenuItem>
                                            <MenuItem>Open Closed Tab</MenuItem>
                                            <MenuItem>Open File</MenuItem>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </div>

                            <FaAngleRight />
                        </li>

                    </ul>
                </aside>
                <main className=" flex-1">{children}</main>
            </div>
        </div>
    )

}