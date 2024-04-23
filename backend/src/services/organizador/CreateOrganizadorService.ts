import  prismaClient from '../../prisma'

interface OrganizadorRequest{
    nome: String;
    email:String;
    senha: String
}
class CreateOrganizadorService{
    async execute( { nome, email, senha }:OrganizadorRequest){

        console.log(nome);
        
        return { nome: nome}
    }
}
export { CreateOrganizadorService }