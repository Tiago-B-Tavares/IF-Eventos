export interface OrganizadorProps {
    organizador: any;
    id: string;
    nome: string;
}

export interface EventoProps {
    id?: string;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    organizador_id: string;
    atividades: AtividadesProps[];
    organizadores: OrganizadorProps[];
}
export interface TypesEventsProps {

    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    organizador_id?: string;
}

export interface ResponsaveisProps {
    responsavel: {
        nome: string;
    };
}

export interface InscritosProps {
    participante: {
        nome: string;
    };
}

export interface AtividadesProps {
    id: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    createdAt: string;
    concomitante: boolean;
    responsaveis: ResponsaveisProps[];
    inscricoes: InscritosProps[];
    ch: number;
}
export interface CreateAtividadesProps {
    id?: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    concomitante: boolean;
    ch: number;
}

export interface ParticipantesProps {
    id: string,
    nome: string,
    email: string,
    idade: number,
    sexo: "M" | "F"
}
export interface ActivitiesProps {

    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    concomitante: boolean;
    ch: number;
    evento_id: string | null;
}
export interface CreateColabProps {
    nome: string;
    atividade_id: string;
}