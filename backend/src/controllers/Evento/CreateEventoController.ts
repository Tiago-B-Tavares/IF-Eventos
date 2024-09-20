import { Request, Response } from "express";
import { CreateEventoService } from "../../services/evento/CreateEventoService";

class CreateEventoController {

    async handle(req: Request, res: Response) {
       



        const { nome, descricao, dataInicio, dataFim, horario, local, organizador_id } = req.body;

        const createEventoService = new CreateEventoService();
        

        const evento = await createEventoService.execute({
            nome,
            dataInicio,
            descricao,
            dataFim,
            horario,
            local,
            organizador_id
        })


        return res.json(evento);
    }
}
export { CreateEventoController }