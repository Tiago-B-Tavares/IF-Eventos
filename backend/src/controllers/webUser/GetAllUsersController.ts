import { GetDataUserService } from "../../services/webUser/GetAllUsersService";
import { Response } from 'express';

class GetAllUsersController {
    async handle(res: Response) {


        const getUserDataService = new GetDataUserService();

        const userData = await getUserDataService.execute();
     
       
        return userData;

    }
}
export { GetAllUsersController }