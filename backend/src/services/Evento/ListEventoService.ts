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
                    id: true,
                    nome: true,
                    descricao: true,
                    horario: true,
                    dataInicio: true,
                    dataFim: true,
                    local: true,
                    _count: true,
                    organizadores: {
                        select: {
                            organizador: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    atividades: {
                        select: {
                            id: true,
                            nome: true,
                            local: true,
                            horario: true,
                            concomitante: true,
                            descricao: true,
                            vagas: true,
                            ch: true,
                            inscricoes: {
                                select: {
                                    participante: {
                                        select: {
                                            nome: true
                                        }
                                    }
                                }
                            },
                            organizadores: {
                                select: {
                                    organizador: {
                                        select: {
                                            nome: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!listEventos) {
                throw new Error("Nenhum evento encontrado");
            }

            return listEventos;
        } catch (error) {
            return { message: `Não foi possível listar os Eventos devido ao erro: ${error}` };
        }
    }
}

export { ListEventoService };
