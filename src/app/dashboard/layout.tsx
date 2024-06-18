import React from 'react';
import type { Metadata } from "next";
import MainLayoutDashboard from '../components/MainLayout/MainLayout';
import MenuContextProvider from '@/contexts/MenuContexts';


export const metadata: Metadata = {
    title: "Dashboard"
};

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div>
            <MenuContextProvider>
                <MainLayoutDashboard>{ children }</MainLayoutDashboard>
            </MenuContextProvider>
        </div>
    );
}
