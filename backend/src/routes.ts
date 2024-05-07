import { Router, Request, Response } from 'express';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateWebUserController } from './controllers/webUser/CreateWebUserController'; 
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';
import { DetailWebUserController } from './controllers/webUser/DetailWebUserController';
import { UpdateWebUserController } from './controllers/webUser/UpdateWebuserController';

import { CreateEventoController } from './controllers/evento/CreateEventoController';
import { UpdateEventoController } from './controllers/evento/UpdateEventoController';
import { DeleteEventoController } from './controllers/evento/DeleteEventoController';

import { CreateAtividadeController } from './controllers/atividades/CreateAtividadeController';
import { DeleteAtividadeController } from './controllers/atividades/DeleteAtividadeController';
import { SearchAllAtividadesController } from './controllers/atividades/listAtividadesByEventIdController';




const router = Router();

//User
router.post('/user', new CreateWebUserController().handle);

router.post('/session', new AuthWebUserController().handle);

router.get('/me', isAuthenticated, new DetailWebUserController().handle);

router.put('/user', isAuthenticated, new UpdateWebUserController().handle);

//Evento

router.post('/evento', isAuthenticated, new CreateEventoController().handle);

router.put('/evento', isAuthenticated, new UpdateEventoController().handle);

router.delete('/evento', isAuthenticated, new DeleteEventoController().handle);

//Atividades

router.post('/atividades', isAuthenticated, new CreateAtividadeController().handle);;

router.delete('/atividades', isAuthenticated, new DeleteAtividadeController().handle);

router.get('/evento/atividades', isAuthenticated, new SearchAllAtividadesController().handle);



export { router };