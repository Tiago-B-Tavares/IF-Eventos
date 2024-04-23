import { Request, Response} from 'express'
import { CreateOrganizadorService } from '../../services/organizador/CreateOrganizadorService';

class CreateOrganizadorController{
    async handle(req:Request, res: Response){

        const { nome, email, senha } = req.body;

        const createOrganizadorService = new CreateOrganizadorService();

        const organizador = await createOrganizadorService.execute({
            nome,
            email,
            senha
        });
        return res.json(organizador);
    }
}
export { CreateOrganizadorController }