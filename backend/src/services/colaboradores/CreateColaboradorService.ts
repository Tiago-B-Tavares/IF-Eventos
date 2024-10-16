import prismaClient from "../../prisma";

interface CreateColaboradorRequest {
    organizador_id: string;
    atividade_id: string;
}

class CreateColaboradorService {
    async execute({ organizador_id, atividade_id }: CreateColaboradorRequest) {
        try {
          console.log(organizador_id, " e ",  atividade_id);
          
           
           const organizador = prismaClient.organizador.findFirst({
            where:{
                id:organizador_id
            }
           })
           if (organizador) {

            const respAtividade = await prismaClient.atividadeResponsavel.findFirst({
                        where: {
                            responsavel_id: organizador_id,
                            atividade_id: atividade_id
                        }
                    });
    
                  
                    if (!respAtividade) {
                        const colaborador = await prismaClient.responsavel.create({
                            data: {
                                id:(await organizador).id,
                                nome: (await organizador).nome
                            }
                        });
    
                await prismaClient.atividadeResponsavel.create({
                            data: {
                                atividade_id: atividade_id,
                                responsavel_id: colaborador.id
                            }
                        });
               }
    
                return { message: "Colaborador registrado com sucesso!" };
                    }else{
                        throw new Error("Já é o responsavel");
                        
                    }
    
            

        } catch (error) {
            throw new Error(`Não foi possível adicionar colaborador devido ao erro: ${error}`);
        }
    }
}

export { CreateColaboradorService };




 
            // // Verifica se o colaborador já existe
            // const colaboradorExists = await prismaClient.organizador.findFirst({
            //     where: { id: organizador_id }
            // });

            // // Se o colaborador existir, verifica se ele já está associado à atividade
           
            //     const respAtividade = await prismaClient.atividadeResponsavel.findFirst({
            //         where: {
            //             responsavel_id: colaboradorExists.id,
            //             atividade_id: atividade_id
            //         }
            //     });

            //     // Se já for responsável pela atividade, lança erro
            //     if (respAtividade) {
            //         throw new Error("Já é responsável por essa atividade.");
            //     }

              
            //     await prismaClient.atividadeResponsavel.create({
            //         data: {
            //             atividade_id: atividade_id,
            //             responsavel_id: colaboradorExists.id
            //         }
            //     });

            
            //     // Se o colaborador não existir, deve criar o colaborador com um nome padrão ou receber o nome como parâmetro
            //     // Aqui você pode definir como vai criar o novo colaborador, por exemplo, passando um nome
            //     const colaborador = await prismaClient.responsavel.create({
            //         data: {
            //             nome: colaboradorExists.nome
            //         }
            //     });

            //     await prismaClient.atividadeResponsavel.create({
            //         data: {
            //             atividade_id: atividade_id,
            //             responsavel_id: colaborador.id
            //         }
            //     });
           