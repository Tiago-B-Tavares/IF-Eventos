import { Request, Response } from "express";
import { UpdateEventoService } from "../../services/evento/UpdateEventoService";

class UpdateEventoController {
    async handle(req: Request, res: Response) {

        const id  = req.user_id as string;

        const { data, horario, local, organizador_id } = req.body;

        const updateEventoService = new UpdateEventoService();

        const evento = await updateEventoService.execute({
            id,
            data,
            horario,
            local,
            organizador_id
        })
        return res.json(evento);
    }

}
export { UpdateEventoController }