import { Router, Request, Response } from 'express';

import { CreateWebUserController } from './controllers/webUser/CreateWebUserController'; 
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';
import { DetailWebUserController } from './controllers/webUser/DetailWebUserController';
import { UpdateWebUserController } from './controllers/webUser/UpdateWebuserController';

import { CreateEventoController } from './controllers/evento/CreateEventoController';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { UpdateEventoController } from './controllers/evento/UpdateEventoController';
import { DeleteEventoController } from './controllers/evento/DeleteEventoController';





const router = Router();

//User
router.post('/user', new CreateWebUserController().handle) 

router.post('/session', new AuthWebUserController().handle)

router.get('/me', isAuthenticated, new DetailWebUserController().handle)

router.put('/user', isAuthenticated, new UpdateWebUserController().handle)

//Evento

router.post('/evento', isAuthenticated, new CreateEventoController().handle)

router.put('/evento', isAuthenticated, new UpdateEventoController().handle)

router.delete('/evento', isAuthenticated, new DeleteEventoController().handle)

export { router };