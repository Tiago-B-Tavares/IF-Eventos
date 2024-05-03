import { Request, Response } from "express";
import { DeleteEventoService } from "../../services/evento/DeleteEventoService";

class DeleteEventoController {
    async handle(req: Request, res: Response) {
        
            const { id, organizador_id } = req.body;

            const deleteEventoService = new DeleteEventoService();

            const deleteEvento = await deleteEventoService.execute({ id, organizador_id })

           return res.json(deleteEvento) 
    }
}
export { DeleteEventoController  }