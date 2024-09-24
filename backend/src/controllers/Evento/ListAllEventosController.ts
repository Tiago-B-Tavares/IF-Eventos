import { Request, Response } from "express";
import { ListAllEventosService } from "../../services/evento/ListAllEventosService";

class ListAllEventosController {
    async handle(req:Request, res:Response){
        
        const eventoList = new ListAllEventosService();
        const eventos = await eventoList.execute()
        return res.json(eventos)
    }
}
export { ListAllEventosController }