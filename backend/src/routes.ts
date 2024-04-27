import { Router, Request, Response } from 'express';

import { CreateWebUserController } from './controllers/webUser/CreateWebUserController'; 
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';
import { DetailWebUserController } from './controllers/webUser/DetailWebUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';



import { CreateAppUserController } from './controllers/appUser/CreateAppUserController';



const router = Router();





//web
router.post('/web_user', new CreateWebUserController().handle) 

router.post('/session', new AuthWebUserController().handle)

router.get('/me', isAuthenticated, new DetailWebUserController().handle)



//app

router.post('/app_user', new CreateAppUserController().handle)

export { router };