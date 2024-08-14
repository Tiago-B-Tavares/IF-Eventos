import { Request, Response } from "express";
import { CountEventosService } from "../../services/evento/CountEventosService"

class CountEventosController {
    async handle(req:Request, res:Response){
        const id = req.query.id as string 
        const eventoList = new CountEventosService();
        const eventos = await eventoList.execute({id})
        return res.json(eventos)
    }
}
export { CountEventosController }