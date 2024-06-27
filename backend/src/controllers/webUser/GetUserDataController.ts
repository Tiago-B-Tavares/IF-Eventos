import { GetDataUserService } from "../../services/webUser/getUserDataService";
import { Response } from 'express';

class GetUserDataController {
    async handle(res: Response) {


        const getUserDataService = new GetDataUserService();

        const userData = await getUserDataService.execute();
       console.log(userData);
       
        return res.json(userData)

    }
}
export { GetUserDataController }