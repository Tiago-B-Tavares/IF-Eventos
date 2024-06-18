import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from '@chakra-ui/react';

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import NextAuthSessionProvider from "@/providers/sessionProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "next-auth credentials",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthSessionProvider> 
          <ChakraProvider>
            {children}
          </ChakraProvider>
         </NextAuthSessionProvider>
      </body>
    </html>
  );
}
