import { Request, Response } from "express";
import { CreateInscricaoService } from "../../services/inscricoes/CreateInscricaoService";

class CreateInscricoesController {
    async handle(req: Request, res: Response) {
        const { atividade_id, participante_id} = req.body;

        const createInscricaoService = new CreateInscricaoService();

        const inscrever = await createInscricaoService.execute({
            atividade_id,
            participante_id
        })
        return res.json(inscrever);
    }
}
export { CreateInscricoesController }