
"use client"

import { useSession } from "next-auth/react";


export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="flex flex-wrap gap-4 w-full  bg-white">
           {session?.user.id}
           <h1> {session?.user.role}</h1>
        </div>

    )
}