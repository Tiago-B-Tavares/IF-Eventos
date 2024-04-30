import { Request, Response } from 'express';
import { UpdateWebUserService } from '../../services/webUser/UpdateWebUserService'

class UpdateWebUserController{
    async handle( req: Request, res: Response){
        const { id, nome, email } = req.body;

        const updateWebUserService = new UpdateWebUserService();

        const user = await updateWebUserService.execute({
                id, 
                nome, 
                email
            });
        
        return res.json(user);

    }
}
export { UpdateWebUserController }