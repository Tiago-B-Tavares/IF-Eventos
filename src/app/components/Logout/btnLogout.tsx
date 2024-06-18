// BtnLogout.jsx (ou BtnLogout.tsx se estiver usando TypeScript)
import { signOut, useSession } from "next-auth/react";

export default function BtnLogout() {
    const { data: session } = useSession(); // Obtém a sessão do usuário

    const handleSignOut = async () => {
        await signOut(); // Função assíncrona para realizar o logout
    };

    return (
        <button onClick={handleSignOut}>
            Sair
        </button>
    );
}
