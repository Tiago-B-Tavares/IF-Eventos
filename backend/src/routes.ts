import { Router, Request, Response } from 'express';
import multer from 'multer';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateWebUserController } from './controllers/webUser/CreateWebUserController';
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';
import { DetailWebUserController } from './controllers/webUser/DetailWebUserController';
import { UpdateWebUserController } from './controllers/webUser/UpdateWebuserController';

import { CreateAppUserController } from './controllers/appUser/CreateAppUserController';
import { AuthAppUserController } from './controllers/appUser/AuthAppUserController';
import { UpdateAppUserController } from './controllers/appUser/UpdateAppUserController';

import { CreateEventoController } from './controllers/evento/CreateEventoController';
import { UpdateEventoController } from './controllers/evento/UpdateEventoController';
import { DeleteEventoController } from './controllers/evento/DeleteEventoController';
import { ListEventoController } from './controllers/evento/ListEventoController';

import { CreateAtividadeController } from './controllers/atividades/CreateAtividadeController';
import { DeleteAtividadeController } from './controllers/atividades/DeleteAtividadeController';
import { SearchAllAtividadesController } from './controllers/atividades/listAtividadesByEventIdController';
import { UpdateAtividadeController } from './controllers/atividades/UpdateAtividadeController';

import { CreateInscricoesController } from './controllers/inscricoes/CreateInscricoesController';
import { RemoveInscricaoController } from './controllers/inscricoes/RemoveInscricaoController';
import { ShowInscritosByAtividadeController } from './controllers/inscricoes/ShowInscritosByAtividadeController';

import uploadConfig from './config/multer'


const router = Router();

//Upload de imagem
const upload = multer(uploadConfig.upload("./tmp"));

//User organizador
router.post('/user', new CreateWebUserController().handle);

router.post('/session', new AuthWebUserController().handle);

router.get('/me', isAuthenticated, new DetailWebUserController().handle);

router.put('/user', isAuthenticated, new UpdateWebUserController().handle);

//User participante

router.post('/app/user', new CreateAppUserController().handle);

router.post('/app/session', new AuthAppUserController().handle);


router.put('/app/user', isAuthenticated, new UpdateAppUserController().handle);

//Evento

router.post('/evento', isAuthenticated, new CreateEventoController().handle);

router.get('/eventos', isAuthenticated, new ListEventoController().handle);

router.put('/evento', isAuthenticated, new UpdateEventoController().handle);

router.delete('/evento', isAuthenticated, new DeleteEventoController().handle);

//Atividades

router.post('/atividades', isAuthenticated, upload.single('file'), new CreateAtividadeController().handle);

router.delete('/atividades', isAuthenticated, new DeleteAtividadeController().handle);

router.get('/evento/atividades', isAuthenticated, new SearchAllAtividadesController().handle);

router.put('/atividades', isAuthenticated, upload.single('file'), new UpdateAtividadeController().handle);

//Inscrições

router.post('/inscrever', isAuthenticated, new CreateInscricoesController().handle)

router.delete('/inscrever', isAuthenticated, new RemoveInscricaoController().handle);

router.get('/inscricoes', isAuthenticated, new ShowInscritosByAtividadeController().handle)



export { router };