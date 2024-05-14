import prismaClient from "../../prisma";

interface RemoveInscricaoRequest {
    id: string
}

class RemoveInscricaoService {
    async excute({ id }: RemoveInscricaoRequest) {
        try {
            const removeInscricaoService = await prismaClient.inscricao.delete({
                where: {

                    id: id
                }
            })
            return "inscrição removida com sucesso!"
        } catch (error) {
            return `Erro ao remover inscrição: ${error}`
        }
    }
}
export { RemoveInscricaoService }