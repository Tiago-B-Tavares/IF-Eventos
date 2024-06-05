
import { getServerSession } from "next-auth"

import Image from "next/image";
import  BtnLogout from "../../components/btnLogOut/btnLogout"
import { redirect } from "next/navigation";


export default async function Page() {
    const session = await getServerSession();
    if(!session){
        redirect("/")
    }

    return (
        <div>
            <div>
                <div>Olá, {session?.user?.name} essa é a página dashboard</div>
                <div>email:  {session?.user?.email}</div>
                <BtnLogout/>
            </div>
        </div>
    )
}