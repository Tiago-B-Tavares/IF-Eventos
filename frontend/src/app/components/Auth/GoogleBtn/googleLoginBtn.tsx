"use client"

import { signIn } from "next-auth/react"
import { Image, Button } from '@chakra-ui/react'
import googleIcon from "../../../images/googleIcon.png"
import facebookIcon from "../../../images/facebookIcon.png"

// Converter StaticImageData para string
const googleIconUrl = (googleIcon as unknown as { src: string }).src;
const facebookIconUrl = (facebookIcon as unknown as { src: string }).src;

export default function GoogleLoginBtn() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center  pb-4">

            <button className=" w-60 text-sm flex justify-start rounded-lg" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <img className="w-4 h-4 mr-2" src={googleIconUrl} alt="" />
                Entrar com o google
            </button>

            <button className=" w-60 text-sm flex justify-start rounded-lg" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <img className="w-4 h-4 mr-2" src={facebookIconUrl} alt="" />
                Entrar com o google
            </button>
           

          
        </div>


    )
}