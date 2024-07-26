import { Request, Response } from "express";
import { UpdateEventoService } from "../../services/evento/UpdateEventoService";

class UpdateEventoController {
    async handle(req: Request, res: Response) {

        const { nome, dataInicio, dataFim, horario, local } = req.body;

        const id = req.query.id as string;

        const updateEventoService = new UpdateEventoService();

        const evento = await updateEventoService.execute({
            id,
            nome,
            dataInicio,
            dataFim,
            horario,
            local
        })
        return res.json(evento);
    }
}
export { UpdateEventoController }