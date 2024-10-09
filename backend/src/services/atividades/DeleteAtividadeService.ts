import prismaClient from "../../prisma";

interface atividadeRequest {
    id: string;
}
class DeleteAtividadeService {
    async execute({ id }: atividadeRequest) {


        const existsAtividade = await prismaClient.atividade.findFirst({
            where: {
                id: id
            }
        })

        if (!existsAtividade) {
            throw new Error("Atividade não encontrada!!");
        }


        try {
            const atividade = await prismaClient.atividade.delete({
                where: {
                    id: id
                }
            })
            return "Deletado com sucesso!!"
        } catch (error) {
            return `Erro: Não foi possível deletar essa atividade!  ${error}`
        }
    }
}
export { DeleteAtividadeService }