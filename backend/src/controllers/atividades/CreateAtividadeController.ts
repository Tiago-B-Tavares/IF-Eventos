import { Request, Response } from "express";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

class CreateAtividadeController{
    async handle( req: Request, res: Response ){

        const { local , horario, descricao, vagas, banner, evento_id} = req.body;

        const createAtividadeService = new CreateAtividadeService(); 

        const atividade = await createAtividadeService.execute({
            
            local,
            horario,
            descricao,
            vagas,
           
            banner,
            evento_id
        })
        return res.json(atividade)
    }
}
export { CreateAtividadeController }