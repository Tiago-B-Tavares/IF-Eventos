import prismaClient from "../../prisma";

interface UserExistsRequest {
  email: string;
}

interface UserExistsResponse {
  id?:string;
  exists: boolean;
  googleId?: string;
}

class UserAlreadyExistsService {
  async execute({ email }: UserExistsRequest): Promise<UserExistsResponse> {
    try {
      console.log(email);

      const user = await prismaClient.organizador.findFirst({
        where: {
          email: email,
        },
        select: {
          id:true,
          googleId: true,
        },
      });

    

      if (user) {
        return { exists: true, id:user.id, googleId: user.googleId };
      } else {
        return { exists: false };
      }

    } catch (error: any) {
      throw new Error(`Erro no banco de dados: ${error.message}`);
    }
  }
}

export { UserAlreadyExistsService };
