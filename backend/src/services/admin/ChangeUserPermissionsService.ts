import { Role } from '../../enums/permissionRoles';
import prismaClient from '../../prisma';
class ChangeUserPermissionsService {
    async execute({ organizador_id, role }: { organizador_id: string, role: Role }) {
        try {
console.log(organizador_id, role);

            const changeRole = await prismaClient.organizador.update({
                where: {
                    id: organizador_id
                },
                data: {
                    role: role
                },
                select:{
                    nome: true,
                    role:true,

                }
            })
            console.log(changeRole);
            
            return "Permissoes atualizadas!"
        } catch (error) {
            return "erro ao atualizar permissões"
        }
    }
} export { ChangeUserPermissionsService }