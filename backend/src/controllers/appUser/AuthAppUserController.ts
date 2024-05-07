import { Request, Response } from 'express'
import { AuthAppUserService } from '../../services/appUser/AuthAppUserService'

class AuthAppUserController {
    async handle(req: Request, res: Response) {

        const { email, senha } = req.body;

        const authAppUserService = new AuthAppUserService();

        const auth = await authAppUserService.execute({
            email,
            senha
        })

        return res.json(auth);
    }
}
export { AuthAppUserController }