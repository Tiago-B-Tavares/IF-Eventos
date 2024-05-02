import { Request, Response } from "express";
import { UpdateEventoService } from "../../services/evento/UpdateEventoService";

class UpdateEventoController {
    async handle(req: Request, res: Response) {

        const { id, data, horario, local  } = req.body;

        const updateEventoService = new UpdateEventoService();

        const evento = await updateEventoService.execute({
            id,
            data,
            horario,
            local
        })   
        return res.json({
            message: "Alterado com sucesso!"
        });
    }
}
export { UpdateEventoController }