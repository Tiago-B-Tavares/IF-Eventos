import { Response, Request } from "express";
import { GetUserDataByIdService } from "../../services/webUser/GetUserDataByIdService";

class GetUserDataByIdController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;

        const getUserDataByIdService = new GetUserDataByIdService()

        const userdata = await getUserDataByIdService.execute({ id })

        return res.json(userdata );


    }
}
export { GetUserDataByIdController }