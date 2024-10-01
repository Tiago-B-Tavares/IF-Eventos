export interface EventoProps {
    id?: string;
    nome: string;
    descricao:string;
    dataInicio: string;
    dataFim: string;
    horario:string;
    local: string;
    organizador_id:string;
    atividades: AtividadesProps[];
}
export interface TypesEventsProps {
    id:string
    nome: string;
    descricao:string;
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
    ch: number;
}

export interface ParticipantesProps{
    id:string,
    nome: string,
    email: string,
    idade:number,
    sexo: "M" | "F"
}