import { api } from "@/services/setupApiClient";

interface ActivitiesProps {
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    banner: File;
    evento_id: string;
}

export default async function CreateActivity({ nome, horario, local, descricao, vagas, banner, evento_id }: ActivitiesProps) {
    try {
       
       console.error("sdadsfds");
       
       
    //    const formData = new FormData();
    //    formData.append('horario', horario);
    //    formData.append('nome', nome);
    //    formData.append('local', local);
    //    formData.append('descricao', descricao);
    //    formData.append('vagas', vagas.toString());
    //    formData.append('banner', banner);
    //    formData.append('evento_id', evento_id);

    //    const response = await api.post('/atividades', formData, {
    //        headers: {
    //            'Content-Type': 'multipart/form-data'
    //        }
    //    });

    //    const activity = response.data;
    //    return activity;

    } catch (error) {
        console.error('Erro ao cadastrar atividade:', error);
        throw new Error('Erro ao cadastrar atividade');
    }
}
