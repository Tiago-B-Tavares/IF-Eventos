import { Request, Response } from 'express';
import { RemoveInscricaoService } from '../../services/inscricoes/RemoveInscricaoService';

class RemoveInscricaoController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;

        const removeInscricaoService = new RemoveInscricaoService();

        const remover = await removeInscricaoService.excute({ id });

        return res.json(remover);
    }

}
export { RemoveInscricaoController }