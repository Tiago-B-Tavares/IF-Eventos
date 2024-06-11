"use client";

import { signIn } from "next-auth/react";
import { Input, Button, Box, Divider, AbsoluteCenter, Heading, Text } from '@chakra-ui/react'
import GoogleLoginBtn from "../GoogleBtn/googleLoginBtn";
import { Highlight } from '@chakra-ui/react'
import Link from "next/link";


export function FormLogin() {
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        signIn("credentials", {
            ...data,
            callbackUrl: "/dashboard"
        })
    }
    return (

        <div className='min-w-80 md:w-48 flex flex-col items-center justify-center border shadow-2xl'>
            <Heading as='h3' size='lg' className=" py-8 text-purple-700">
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
                <Link className='' href='#'>
                    Cadastre-se
                </Link>
            </Text>
            <Box position='relative' padding='7'>
                <Divider/>
                <AbsoluteCenter className="text-gray-950 text-xs text-center text-nowrap" bg='white' px='4'>
                    Ou entre com
                </AbsoluteCenter>
            </Box>

            <GoogleLoginBtn/>
        </div>




    )
}