import { Request, Response } from "express";
import { AddOrganizadorEventoService } from "../../services/evento/AddOrganizadorEventoService";

export class AddOrganizadorEventoController {
    async handle(req: Request, res: Response) {

        const { evento_id, organizador_id } = req.body

        const addOrganizadorEventoService = new AddOrganizadorEventoService()

        const newOrgEvento = addOrganizadorEventoService.execute({
            evento_id, 
            organizador_id
        })

        res.json(newOrgEvento)
    }

} 