import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import ChakraUIProvider from "@/providers/ChakraUIProvider";


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
          <ChakraUIProvider>
            {children}
          </ChakraUIProvider>
         </NextAuthSessionProvider>
      </body>
    </html>
  );
}
