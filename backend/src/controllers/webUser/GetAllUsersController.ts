import { GetDataUserService } from "../../services/webUser/GetAllUsersService";
import { Request, Response } from "express";

class GetAllUsersController {
    async handle(req:Request, res:Response ) {

        try {
            const getUserDataService = new GetDataUserService();

            const userData = await getUserDataService.execute();
           

            return res.json(userData);

        } catch (error) {
            throw new Error("erro: " + error);
            
        }


    }
}
export { GetAllUsersController }