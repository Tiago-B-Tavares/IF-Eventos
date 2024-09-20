import { Request, Response } from 'express';
import { CreateAtividadeService } from '../../services/atividades/CreateAtividadeService';

class CreateAtividadeController {
    async handle(req: Request, res: Response) {
        try {
            
            const {
                nome,
                descricao,
                local,
                horario,
                vagas,
                ch,
                concomitante,
                organizador_id
            } = req.body;

        
            const evento_id = req.query.id as string;

            const createAtividadeService = new CreateAtividadeService();

            
            const atividade = await createAtividadeService.execute({
                nome,
                descricao,
                local,
                horario,
                vagas: Number(vagas),
                ch: Number(ch), 
                concomitante: !!concomitante ,
              
                evento_id,
                organizador_id,
               
            });

            // Retornando a resposta com a atividade criada
            return res.json(atividade);
        } catch (error) {
            // Retornando erro em caso de falha
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateAtividadeController };
