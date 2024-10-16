import { Request, Response } from "express";
import { CreateColaboradorService } from "../../services/colaboradores/CreateColaboradorService";

class CreateColaboradorController {
    async handle(req: Request, res: Response) {

        const { organizador_id, atividade_id } = req.body;

        const createColaborador = new CreateColaboradorService()

        const colaboradorCreated = await createColaborador.execute({
            organizador_id,
            atividade_id
        })
        return res.json(colaboradorCreated)
    }
}
export { CreateColaboradorController }