import {Request, Response} from 'express'
import { DetailWebUSerService } from '../../services/webUser/DetailWebUserService'

class DetailWebUserController{
    async  handle(req: Request, res: Response) {

        const detailWebUserService =  new DetailWebUSerService()

        const user = await detailWebUserService.execute()

        return res.json(user);
        
    }
}

export { DetailWebUserController }