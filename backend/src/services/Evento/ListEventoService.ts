import prismaClient from "../../prisma";

interface ListEventosRequest {
    id: string;
}

class ListEventoService {
    async execute({ id }: ListEventosRequest) {
        try {
            const listEventos = await prismaClient.evento.findMany({
                where: {
                    organizadores: {
                        some: {
                            organizador: {
                                id: id
                            }
                        }
                    }
                },
                select: {
                    nome: true,
                    horario: true,
                    dataInicio: true,
                    dataFim: true,
                    local: true,
                    _count: true,
                    organizadores: {
                        select: {
                            organizador:{
                                select:{
                                    nome:true
                                }
                            }
                        }
                    },
                    atividades: {
                        select: {
                            id: true,
                            nome: true,
                            horario: true,
                            descricao:true,
                            responsaveis:{
                                select:{
                                    responsavel:{
                                        select:{
                                            nome:true
                                        }
                                    }
                                }
                            }
                        },
                    }

                }
            });

            console.log("eventos :", listEventos);

            return listEventos;
        } catch (error) {
            return { message: `Não foi possível listar os Eventos devido ao erro: ${error}` };
        }
    }
}

export { ListEventoService };
