import { Request, Response} from 'express'
import { CreateWebUserService } from '../../services/webUser/CreateWebUserService';

class CreateWebUserController{
    async handle(req:Request, res: Response){

        const { nome, email, senha } = req.body;

        const createWebUserService = new CreateWebUserService(); 

        const user = await createWebUserService.execute({
            nome,
            email,
            senha
        });
        
        return res.json(user);
    }
}
export { CreateWebUserController }