import { Request, Response } from 'express'
import { AuthWebUserService } from '../../services/webUser/AuthWebUserService'

class AuthWebUserController {
    async handle(req: Request, res: Response) {

        const { email, senha } = req.body;

        const authWebUserService = new AuthWebUserService();

        const auth = await authWebUserService.execute({
            email,
            senha
        })

        return res.json(auth);
    }
}
export { AuthWebUserController }