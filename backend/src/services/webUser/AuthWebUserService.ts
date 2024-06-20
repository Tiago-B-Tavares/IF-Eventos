import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface AuthRequest {
  email: string;
  senha: string;
}
class AuthWebUserService {
  async execute({ email, senha }: AuthRequest) {

   
    
    try {
      const user = await prismaClient.organizador.findFirst({
        where: {
          email: email
        }
      })

      if (!user) {
        throw new Error("Email ou senha incorretos!");
      }

      const senhaMatch = await compare(senha, user.senha)

      if (!senhaMatch) {
        throw new Error("Email ou senha incorretos!");
      }
      const token = sign({
        name: user.nome,
        email: user.email
      },
        process.env.JWT_SECRET,
        {
          subject: user.id,
          expiresIn: '30d'
        }

      )
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        token: token
      }
    } catch (error) {
      console.error("Erro no processo de autenticação:", error);
      throw new Error(`Não foi possível logar usuário devido ao erro: ${error.message}`);
    }
  }
}
export { AuthWebUserService }