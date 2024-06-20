import { Request, Response } from "express";
import { ListEventoService } from "../../services/evento/ListEventoService";

class ListEventoController {
    async handle(req:Request, res:Response){
        const id = req.query.id as string 
        const eventoList = new ListEventoService();
        const eventos = await eventoList.execute({id})
        return res.json(eventos)
    }
}
export { ListEventoController }