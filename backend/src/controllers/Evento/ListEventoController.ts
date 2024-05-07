import { Request, Response } from "express";
import { ListEventoService } from "../../services/evento/ListEventoService";

class ListEventoController {
    async handle(req:Request, res:Response){
        const eventoList = new ListEventoService();
        const eventos = await eventoList.execute()
        return res.json(eventos)
    }
}
export { ListEventoController }