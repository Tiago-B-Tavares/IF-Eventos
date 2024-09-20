import { Request, Response } from "express";
import { ShowInscritosByAtividadeService } from "../../services/inscricoes/ShowInscritosByAtividadeService";

class ShowInscritosByAtividadeController {
    async handle(req: Request, res: Response){
        
        const atividade_id = req.query.atividade_id;

        const showInscritosService = new ShowInscritosByAtividadeService();
        
        const showInscritos = await showInscritosService.execute({atividade_id})

        return res.json(showInscritos);
    }
} 
export { ShowInscritosByAtividadeController }