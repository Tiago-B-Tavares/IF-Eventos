import { Request, Response } from "express";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

class CreateAtividadeController{
    async handle( req: Request, res: Response ){

        const { local , horario, descricao, vagas, banner, eventoId} = req.body;

        const createAtividadeService = new CreateAtividadeService(); 

        const atividade = await createAtividadeService.execute({
            
            local,
            horario,
            descricao,
            vagas,
           
            banner,
            eventoId
        })
        return res.json(atividade)
    }
}
export { CreateAtividadeController }