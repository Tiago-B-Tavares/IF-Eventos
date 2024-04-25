import { Router, Request, Response } from 'express'
import { CreateWebUserController } from './controllers/webUser/CreateWebUserController'; 
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';

const router = Router();

router.post('/web_user', new CreateWebUserController().handle) 

router.post('/session', new AuthWebUserController().handle)

export { router };