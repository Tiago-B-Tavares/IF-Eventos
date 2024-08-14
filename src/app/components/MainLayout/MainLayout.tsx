"use client";

import MainHeader from "../Header/Header";
import { MenuContexts } from "../../../contexts/MenuContexts";
import { useContext } from "react";
import MenuBar from "../MenuBar/MenuBar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function MainLayout({ children }: DashboardLayoutProps) {

    const { open } = useContext(MenuContexts);

    return (

        <div className="flex bg-gray-200 w-screen min-h-screen">
            <MenuBar />
            <div className="w-full">
                <MainHeader />
                <main className="lg:p-4 ">
                    {children}
                </main>
            </div>
        </div>
    )
}