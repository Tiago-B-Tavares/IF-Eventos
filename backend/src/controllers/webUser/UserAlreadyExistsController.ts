import {  Request, Response } from 'express'
import { UserAlreadyExistsService } from '../../services/webUser/UserAlreadyExistsService'


class UserAlreadyExistsController {
    async handler(req: Request, res: Response) {

        const email = req.query.email as string

        const userAlreadyExistsService = new UserAlreadyExistsService()

        const result = await userAlreadyExistsService.execute({ email });

        return res.json(result);


    }
}
export { UserAlreadyExistsController }