import { Request, Response } from "express";
import { VerificaAtividadesOrganizadorService } from "../../services/atividades/VerificaAtividadesORganizadorService";



class VerificaAtividadesOrganizadorController {
    async handle(req: Request, res: Response) {
        try {

            const organizador_id = req.query.id as string;

            const verificaAtividadesOrganizadorService = new VerificaAtividadesOrganizadorService();

            const verifica = await verificaAtividadesOrganizadorService.execute(organizador_id)

            return res.json(verifica)

        } catch (error) {
            console.log(error)
        }

    }
} export { VerificaAtividadesOrganizadorController }