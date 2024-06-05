"use client";

import { signIn } from "next-auth/react"


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
        <form onSubmit={login} className="login">

            <input
                type="email"
                placeholder="Email"
                name="email"
            />

            <input
                type="password"
                placeholder="Senha"
                name="password"
            />

            <button type="submit">Entrar</button>
        </form>
    )
}