"use client";

import { signIn } from "next-auth/react";
import { Input, Box, Divider, AbsoluteCenter, Heading, Text } from '@chakra-ui/react'
import GoogleLoginBtn from "../GoogleBtn/googleLoginBtn";
import { Highlight } from '@chakra-ui/react'
import Link from "next/link";


export function FormLogin() {
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
     
        let email = formData.get("email") as string;

        email = email.trim().toLowerCase();
        
        const password = formData.get("password")

        const data = {
            email:email,
            password:password
        }
        signIn("credentials", {
            ...data,
            callbackUrl: "/dashboard"
        })
}
    return (

        <div className='min-w-96 h-auto  py-7  lg:w-48 md:w-full sm:w-full  flex flex-col items-center justify-center border rounded-2xl shadow-2xl'>
            <Heading as='h3' size='lg' className=" py-8 text-purple-700 sm:text-lg">
                <Highlight
                    query='login' styles={{ px: '2', py: '1', rounded: 'lg', bg: 'orange.100', color: '#7e22ce' }}>
                    Faça seu login
                </Highlight>
            </Heading>
            <form onSubmit={login} className='flex items-center  flex-col gap-4  p-6'>

                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    size="md"
                    focusBorderColor='#7e22ce'
                />

                <Input
                    className='outline-purple-700	'
                    type="password"
                    placeholder="Senha"
                    name="password"
                    size="md"
                    focusBorderColor='#7e22ce'

                />
                <button className="text-white bg-purple-700 py-2 px-4 rounded-md	 " type="submit">Entrar</button>
            </form>
            <Text className="text-xs text-right" color='#7e22ce' >
                Não possui uma conta?{' '}
                <Link className='' href='/signup'>
                    Cadastre-se
                </Link>
            </Text>
            <Box position='relative' padding='7'>
                <Divider />
                <AbsoluteCenter className="text-gray-950 text-xs text-center text-nowrap" bg='white' px='4'>
                    Ou entre com
                </AbsoluteCenter>
            </Box>

            <GoogleLoginBtn />
        </div>
    )
}