import { Request, Response } from 'express';
import { UpdateWebUserService } from '../../services/webUser/UpdateWebUserService'

class UpdateWebUserController{
    async handle( req: Request, res: Response){

        const { nome, email } = req.body;
        
        const id  = req.user_id as string;
        
        const updateWebUserService = new UpdateWebUserService();

        const user = await updateWebUserService.execute({
                id, 
                nome, 
                email
            });
        
        return res.json({
            menssage: "Usuário alterado com sucesso!"
        });

    }
}
export { UpdateWebUserController }