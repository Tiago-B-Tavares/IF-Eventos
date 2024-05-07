import { Request, Response } from "express";
import { SearchAllAtividadesService } from "../../services/atividades/SearchAllAtividadesService";


class SearchAllAtividadesController {

    async handle( req: Request, res: Response) {
        
        try{

            const allAtividades = new SearchAllAtividadesService() 

            const atividades = await allAtividades.execute()

            res.json(atividades);
    }catch(error){
        return ("Ocorreu um erro ao buscar as atividades \n" + error);
    }

}}
export { SearchAllAtividadesController }