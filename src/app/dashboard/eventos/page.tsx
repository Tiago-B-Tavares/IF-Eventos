import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Eventos(){
    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }
    return (
        <div>lista de eventos</div>
    )
}