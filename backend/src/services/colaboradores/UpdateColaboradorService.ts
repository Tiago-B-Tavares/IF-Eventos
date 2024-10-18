import prismaClient from "../../prisma"

interface UpdateColaboradorProps {
    id: string;
    nome: string;

}

class UpdateColaboradorService {
    async execute({ id, nome }: UpdateColaboradorProps) {
        try {
          
        } catch (error) {
            console.error(error);
            return { message: "Erro ao Atualizar", error };

        }
    }
}
export { UpdateColaboradorService }