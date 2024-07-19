import { Request, Response } from 'express';
import { CreateWebUserService } from '../../services/webUser/CreateWebUserService';
import { Role } from '../../enums/permissionRoles'

class CreateWebUserController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha, googleId } = req.body;
    

    try {
      const createWebUserService = new CreateWebUserService();

      const user = await createWebUserService.execute({
        nome,
        email,
        senha,
        googleId,
      });

      return res.json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export { CreateWebUserController };
