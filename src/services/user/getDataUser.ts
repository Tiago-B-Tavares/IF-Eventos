import { api } from "@/services/setupApiClient";

interface DataUserProps {
    exists: boolean;
    id: string;
    googleId: string;
}

export default async function getDataUser(email: string): Promise<DataUserProps> {
    try {
        const response = await api.post(`/check-email?email=${email}`);
        
        const userData: DataUserProps = response.data;

        return userData;

    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        throw new Error('Erro ao obter dados do usuário');
    }
}
