import editActivity from "@/services/activities/editActivity";
import { Input, Select, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";

export interface ResponsaveisProps {
    responsavel: {
        nome: string;
    };
}

interface AtividadesProps {
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

export default function btnEditar({ id, eventoId }: { id: string; eventoId: string }) {
    const [nome, setNome] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [horario, setHorario] = useState<string>("");
    const [concomitante, setConcomitante] = useState<boolean>(false);
    const [ch, setCh] = useState<number>(0);
    const [vagas, setVagas] = useState<number>(0);
    const toast = useToast();

    const handleEditActivity = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedActivity: Partial<AtividadesProps> = {
                id,
                nome,
                local,
                descricao,
                horario,
                concomitante,
                ch,
                vagas,
                eventoId,
            };

            // await editActivity(updatedActivity);

            toast({
                title: "Atividade atualizada com sucesso!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Erro ao editar a atividade:', error);
            toast({
                title: "Erro ao atualizar a atividade.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <form onSubmit={handleEditActivity}>
            <Stack spacing={3} className="border-1 border-green-700 font-semibold">
                <label htmlFor="nome">Nome da Atividade</label>
                <Input
                    id="nome"
                    placeholder="Nome da Atividade"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="local">Local</label>
                <Input
                    id="local"
                    placeholder="Local"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="descricao">Descrição</label>
                <Input
                    id="descricao"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="horario">Horário</label>
                <Input
                    id="horario"
                    placeholder="Horário"
                    value={horario}
                    type="time"
                    onChange={(e) => setHorario(e.target.value)}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="concomitante">Concomitante</label>
                <Select
                    id="concomitante"
                    placeholder="Concomitante"
                    value={concomitante ? "Sim" : "Não"}
                    onChange={(e) => setConcomitante(e.target.value === "Sim")}
                    className="border border-gray-300 rounded-md"
                >
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </Select>
                <label htmlFor="ch">Carga Horária</label>
                <Input
                    id="ch"
                    type="number"
                    placeholder="Carga Horária"
                    value={ch}
                    onChange={(e) => setCh(Number(e.target.value))}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="vagas">Vagas</label>
                <Input
                    id="vagas"
                    type="number"
                    placeholder="Vagas"
                    value={vagas}
                    onChange={(e) => setVagas(Number(e.target.value))}
                    className="border border-gray-300 rounded-md"
                />
            </Stack>
        </form>
    );
}
