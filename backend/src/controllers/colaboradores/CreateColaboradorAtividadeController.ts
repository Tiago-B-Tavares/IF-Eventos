import { Request, Response } from "express";
import { CreateColaboradorAtividadeService } from "../../services/colaboradores/CreateColaboradorAtividadeService";


class CreateColaboradorAtividadeController {
    async handle(req: Request, res: Response) {
        const { organizador_id, atividade_id } = req.body;

        const service = new CreateColaboradorAtividadeService();
        const result = await service.execute({ organizador_id, atividade_id });

        if (result.error) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    }
}

export { CreateColaboradorAtividadeController };
