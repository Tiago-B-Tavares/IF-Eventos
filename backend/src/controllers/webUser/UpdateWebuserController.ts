import { Request, Response } from 'express';
import { UpdateWebUserService } from '../../services/webUser/UpdateWebUserService'

class UpdateWebUserController{
    async handle( req: Request, res: Response){

        const id  = req.query.id as string;

        const { nome, email, senha } = req.body;
        
        const updateWebUserService = new UpdateWebUserService();

        const user = await updateWebUserService.execute({
                id, 
                nome, 
                email, 
                senha
            });
        
        return res.json({
            menssage: "Usuário alterado com sucesso!"
        });

    }
}
export { UpdateWebUserController }