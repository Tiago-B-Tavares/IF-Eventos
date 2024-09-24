import { GetAppUsersService } from "../../services/appUser/GetAppUsersService";
import { Request, Response } from 'express';

class GetAppUsersController {
    async handle(req: Request, res: Response) {
        const getUsers = new GetAppUsersService();

        try {
            const listUsers = await getUsers.execute();
            return res.json(listUsers);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao listar usuários." });
        }
    }
}

export { GetAppUsersController };
