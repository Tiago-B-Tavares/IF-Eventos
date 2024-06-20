import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
//import GetEvents from "../../../services/getEvents/getEvents"
export default async function Eventos(){
    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }
    return (
        <div>eventos</div>
    )
}