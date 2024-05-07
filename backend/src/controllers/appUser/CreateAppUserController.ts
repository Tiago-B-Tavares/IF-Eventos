import { Request, Response} from 'express'
import { CreateAppUserService } from '../../services/appUser/CreateAppUserService';

class CreateAppUserController{
    async handle(req:Request, res: Response){

        const { nome, email, senha, sexo, idade } = req.body;

        const createAppUserService = new CreateAppUserService();

        const user = await createAppUserService.execute({
            nome,
            email,
            senha,
            sexo,
            idade
        });
        return res.json(user);
    }
}
export { CreateAppUserController }