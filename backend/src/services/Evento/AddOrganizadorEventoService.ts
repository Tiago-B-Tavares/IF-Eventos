import prismaClient from "../../prisma";

interface organizadoeEventoProps {
    evento_id: string;
    organizador_id: string;
}

class AddOrganizadorEventoService {
    async execute({ organizador_id, evento_id }: organizadoeEventoProps) {


        try {
           const orgEvento =  await prismaClient.eventoOrganizador.create({
                data: {
                    evento_id: evento_id,
                    organizador_id: organizador_id,
                }
            });
            return orgEvento
        } catch (error) {
            throw new Error("erro ao adicionar irganizador do evento: " + error);
            
        }

    }
} export { AddOrganizadorEventoService }