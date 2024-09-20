import { Request, Response } from "express";
import { DeleteEventoService } from "../../services/evento/DeleteEventoService";

class DeleteEventoController {
    async handle(req: Request, res: Response) {

        const id = req.query.id as string;

        if (!id) {
            res.json("Não tem um id")
        } else {
            const deleteEventoService = new DeleteEventoService();

            const evento = await deleteEventoService.execute({ id })

            return res.json(evento)
        }
    }
}
export { DeleteEventoController }