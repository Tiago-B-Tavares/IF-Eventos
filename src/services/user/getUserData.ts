import { api } from "@/services/setupApiClient";
import { useSession } from "next-auth/react";

interface DataUserProps {
    exists: boolean;
    id: string;
    googleId: string;
}

export default async function getUserData(email: string): Promise<DataUserProps> {

    try {
        const response = await api.post(`/check-email?email=${email}`);

        const { exists, id, googleId } = response.data;
        const userData = { exists, id, googleId }
        return userData;

    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw new Error('Erro ao obter dados do usuário');
    }
}
