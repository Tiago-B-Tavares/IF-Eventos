import { Request, Response } from "express";
import { DeleteAtividadeService } from "../../services/atividades/DeleteAtividadeService";

class DeleteAtividadeController {

    async handle(req: Request, res: Response) {

        const  id  = req.query.id as string;

        const deleteAtividade = new DeleteAtividadeService();

        const atividade = await deleteAtividade.execute({ id });

        res.json({message: atividade})
    }
}
export { DeleteAtividadeController }