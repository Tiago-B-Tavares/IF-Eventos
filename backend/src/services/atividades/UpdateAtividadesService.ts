import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma";

interface UpdateAtividadeRequest {
    id: string;
    local: string;
    horario: string;
    descricao: string;
    vagas: string;
    banner: string;
    evento_id: string;
}
class UpdateAtividadesService {
    async execute({ id, local, horario, descricao, vagas, banner, evento_id }: UpdateAtividadeRequest) {
        try {
            const updadeEvento = await prismaClient.atividade.update({
                where: {
                    id: id
                },
                data: {

                    local,
                    horario,
                    descricao,
                    vagas,
                    banner,
                    evento_id

                }
            })
        } catch (error) {
            return { message: `Não foi possível atualizar essa atividade devido ao erro: ${error} `}
        }
    }
}
export { UpdateAtividadesService }