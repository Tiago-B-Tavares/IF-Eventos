import { Request, Response } from "express";
import { CreateColaboradorEventoService } from "../../services/colaboradores/CreateColaboradorEventoService";


class CreateColaboradorEventoController {
    async handle(req: Request, res: Response) {
        const { organizador_id, evento_id } = req.body;

        const service = new CreateColaboradorEventoService();
        const result = await service.execute({ organizador_id, evento_id });
console.log(result);

        if (result.error) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    }
}

export { CreateColaboradorEventoController };
