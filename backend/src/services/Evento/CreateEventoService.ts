import prismaClient from "../../prisma";

interface CreateEventoRequest{
    data: string;
    horario: string;
    local: string;
    organizador_id: string;
   
}

class CreateEventoService{
    async execute( { data, horario, local, organizador_id }: CreateEventoRequest ){

        const evento = await prismaClient.evento.create({
            data: {
                data: data,
                horario: horario,
                local: local,
                organizador_id:organizador_id
                
            },
            select:{
                data: true,
                horario: true,
                local: true
            }
        })
        
        return evento;
    }
}
export { CreateEventoService }