"use client"

import { signIn } from "next-auth/react"
import { Image } from '@chakra-ui/react'
import googleIcon from "../../../images/googleIcon.png"
import facebookIcon from "../../../images/facebookIcon.png"

// Converter StaticImageData para string
const googleIconUrl = (googleIcon as unknown as { src: string }).src;
const facebookIconUrl = (facebookIcon as unknown as { src: string }).src;

export default function GoogleLoginBtn() {
    return (
        <div className="flex flex-row  justify-center pb-4">
            <button className=" w-auto text-sm flex mx-5 rounded-lg border" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="w-6 h-6 " src={googleIconUrl} alt="" />
            </button>

            <button className=" w-auto text-sm flex rounded-lg border" onClick={() => { signIn('google', { callbackUrl: "/dashboard" }) }}>
                <Image className="w-6 h-6 " src={facebookIconUrl} alt="" />
            </button>
        </div>
    )
}