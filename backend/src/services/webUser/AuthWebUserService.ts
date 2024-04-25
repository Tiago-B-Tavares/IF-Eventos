import prismaClient from "../../prisma";
import {  } from "bcryptjs";

interface AuthRequest{
    email: string;
    senha:string;
}
class AuthWebUserService{
    async execute({ email, senha }: AuthRequest){
        
      const user = await prismaClient.organizador.findFirst({
        where:{
            email: email
        }
      })

       if(!user){
        throw new Error("Email ou senha incorretos!");

      } 
     
        return { ok : true }
    }
}
export { AuthWebUserService }