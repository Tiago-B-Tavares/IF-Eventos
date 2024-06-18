
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



export default async function Dashboard() {
    const session = await getServerSession();
    if (!session) {
        redirect("/")
    }

    return (
        <div>
            <h1>home</h1>
        </div>

    )
}