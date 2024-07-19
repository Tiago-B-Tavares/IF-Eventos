import { Request, Response } from 'express';
import { CreateAtividadeService } from '../../services/atividades/CreateAtividadeService';

class CreateAtividadeController {
    async handle(req: Request, res: Response) {
        try {
            const { nome, responsavel, colaboradores, descricao, local, horario, vagas, ch, concomitante } = req.body;
            const evento_id = req.query.id as string;


            const createAtividadeService = new CreateAtividadeService();

            if (!req.file) {
                throw new Error("Erro ao enviar arquivo");
            }

            const { originalname, filename: banner } = req.file;

            const atividade = await createAtividadeService.execute({
                nome,
                responsavel,
                colaboradores,
                descricao,
                local,
                horario,
                vagas:Number(vagas),
                ch:Number(ch),
                concomitante: concomitante==="true",
                banner,
                evento_id
            });

            return res.json(atividade);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateAtividadeController };
