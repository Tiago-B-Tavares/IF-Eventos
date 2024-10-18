import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { Role } from '../../enums/permissionRoles'; 

interface WebUserRequest {
  nome: string;
  email: string;
  senha?: string;
  googleId?: string;

}

class CreateWebUserService {
  async execute({ nome, email, senha, googleId }: WebUserRequest) {
   
    
    try {
      if (!email) {
        throw new Error("Email vazio!");
      }

      // Verifica se o usuário já existe
      const userAlreadyExists = await prismaClient.organizador.findFirst({
        where: { email }
      });

      if (userAlreadyExists) {
        throw new Error("Email já existe!");
      }

      // Hash da senha apenas se fornecida
      const senhaHash = senha ? await hash(senha, 8) : undefined;

      // Criação do usuário
      const user = await prismaClient.organizador.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          googleId,
          role:Role.ACTIVITIES_ADMIN
        },
        select: {
          id: true,
          nome: true,
          email: true,
          role: true
        }
      });

      return user;
    } catch (error) {
      console.error("Erro no processo de autenticação:", error);
      throw new Error(error.message);
    }
  }
}

export { CreateWebUserService };
