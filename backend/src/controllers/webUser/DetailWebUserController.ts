import {Request, Response} from 'express'
import { DetailWebUSerService } from '../../services/webUser/DetailWebUserService'

class DetailWebUserController{
    async  handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const detailWebUserService =  new DetailWebUSerService()

        const user = await detailWebUserService.execute(user_id)

        return res.json(user);
        
    }
}

export { DetailWebUserController }