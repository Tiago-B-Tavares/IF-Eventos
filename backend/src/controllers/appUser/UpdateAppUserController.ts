import { Response, Request, query, json } from "express";
import { UpdateAppUserService } from "../../services/appUser/UpdateAppUserService";

class UpdateAppUserController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string
        const { nome, email, senha, sexo, idade } = req.body;

        const updateAppUserService = new UpdateAppUserService();

        const user = await updateAppUserService.execute({
            id,
            nome,
            email,
            senha,
            sexo,
            idade
        })

        return res.json(user);

    }
}
export { UpdateAppUserController }