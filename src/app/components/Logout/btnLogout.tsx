"use client"

import { signOut } from "next-auth/react"

export default function BtnLogout() {

    return (
        <button onClick={() => { signOut() }}>
            sair
        </button>
    )
}