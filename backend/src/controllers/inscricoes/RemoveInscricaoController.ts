import { Request, Response } from 'express';
import { RemoveInscricaoService } from '../../services/inscricoes/RemoveInscricaoService';

class RemoveInscricaoController {
    async handle(req: Request, res: Response) {
        const {atividade_id, participante_id} = req.body

        const removeInscricaoService = new RemoveInscricaoService();

        const remover = await removeInscricaoService.execute({atividade_id, participante_id } );

        return res.json(remover);
    }

}
export { RemoveInscricaoController }