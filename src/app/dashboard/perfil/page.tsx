import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Perfil(){
    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }
    return (
        <div>Perfil do usuário</div>
    )
}