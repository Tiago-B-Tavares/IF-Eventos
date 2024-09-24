import prismaClient from "../../prisma"

interface UpdateColaboradorProps {
    id: string;
    nome: string;

}

class UpdateColaboradorService {
    async execute({ id, nome }: UpdateColaboradorProps) {
        try {
            const updadeColaboarador = await prismaClient.responsavel.update({

                where: {
                    id: id
                },
                data: {
                    nome: nome
                }

            })
        } catch (error) {
            console.error(error);
            return { message: "Erro ao Atualizar", error };

        }
    }
}
export { UpdateColaboradorService }