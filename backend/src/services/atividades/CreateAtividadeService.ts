import prismaClient from '../../prisma';

interface AtividadeRequest {
    nome: string;
    descricao: string;
    local: string;
    horario: string;
    vagas: number;
    ch: number;
    concomitante: boolean;
    evento_id: string;
    organizador_id: string;  
}

class CreateAtividadeService {
    async execute({ nome, descricao, local, horario, vagas, ch, concomitante, evento_id, organizador_id }: AtividadeRequest) {
        try {
            
          

           let nomeResponsavel = await prismaClient.organizador.findUnique({ where: { id: organizador_id } })
           
        
           
            const atividade = await prismaClient.atividade.create({
                data: {
                    nome,
                    descricao,
                    local,
                    horario,
                    vagas: Number(vagas),
                    ch: Number(ch),
                    concomitante,
                    evento: {
                        connect: { id: evento_id }
                    }
                },
                select: {
                    id: true,
                    nome: true,
                }
            });

            await prismaClient.atividadeOrganizador.create({
                data: {
                    atividade_id: atividade.id,
                    organizador_id: organizador_id,
                },
            });


           

            return { message: "Atividade cadastrada com sucesso!" };

        } catch (error) {
            console.error("Erro no processo de criação da atividade:", error);
            throw new Error(`Não foi possível cadastrar a atividade devido ao erro: ${error.message}`);
        }
    }
}

export { CreateAtividadeService };
