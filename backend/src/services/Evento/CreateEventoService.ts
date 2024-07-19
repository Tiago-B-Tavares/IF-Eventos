import prismaClient from "../../prisma";

interface CreateEventoRequest {
    nome: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    organizador_id: string;
}

class CreateEventoService {
    async execute({ nome, dataInicio, dataFim, horario, local, organizador_id }: CreateEventoRequest) {
        try {
           console.log(nome, dataInicio, dataFim, horario, local, organizador_id);
           
            const evento = await prismaClient.evento.create({
                data: {
                    nome,
                    dataInicio,
                    dataFim,
                    horario,
                    local,
                },
            });

            // Cria a relação no modelo EventoOrganizador
            await prismaClient.eventoOrganizador.create({
                data: {
                    evento_id: evento.id,
                    organizador_id: organizador_id,
                },
            });

            // Recupera o evento com os organizadores
            const eventoComOrganizadores = await prismaClient.evento.findUnique({
                where: { id: evento.id },
                include: {
                    organizadores: {
                        include: {
                            organizador: true,
                        },
                    },
                },
            });

            const eventoResponse = {
                id: eventoComOrganizadores.id,
                nome: eventoComOrganizadores.nome,
                dataInicio: eventoComOrganizadores.dataInicio,
                dataFim: eventoComOrganizadores.dataFim,
                horario: eventoComOrganizadores.horario,
                local: eventoComOrganizadores.local,
                organizadores: eventoComOrganizadores.organizadores.map(org => ({
                    id: org.organizador.id,
                    nome: org.organizador.nome,
                })),
            };

            return eventoResponse;
        } catch (error) {
            return { message: `Não foi possível cadastrar Evento devido ao erro: ${error.message}` };
        }
    }
}

export { CreateEventoService };
