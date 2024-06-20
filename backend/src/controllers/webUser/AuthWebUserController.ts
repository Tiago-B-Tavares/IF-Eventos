import { Request, Response } from 'express'
import { AuthWebUserService } from '../../services/webUser/AuthWebUserService'

class AuthWebUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;
        
        const authWebUserService = new AuthWebUserService();

        const auth = await authWebUserService.execute({
            email,
            senha: password 
        });

       
        return res.json(auth);
    }
}
export { AuthWebUserController }
