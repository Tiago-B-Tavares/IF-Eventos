import { Request, Response } from "express";
import { Role } from "../../enums/permissionRoles";
import { ChangeUserPermissionsService } from "../../services/admin/changeUserPermissionsService";
class ChangeUserPermissionsController {
    async handle(req: Request, res: Response) {

        const id = req.query.id as string;
        const role = req.body.role as Role;
console.log('constroller', id);


        const changeUserPermissionsService = new ChangeUserPermissionsService()

        const change = await changeUserPermissionsService.execute({
            organizador_id: id,
            role: role
        })

        return res.json(change)
    }
} export { ChangeUserPermissionsController }