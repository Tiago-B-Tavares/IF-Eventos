import { Request, Response } from "express";
import { SearchAllAtividadesService } from "../../services/atividades/listAtividadesByEventIdService";


class SearchAllAtividadesController {

    async handle( req: Request, res: Response) {

        const evento_id =  req.query.evento_id as string;

        const allAtividades = new SearchAllAtividadesService() 

        const atividades = await allAtividades.execute({evento_id})

        res.json(atividades);
    }

}
export { SearchAllAtividadesController }