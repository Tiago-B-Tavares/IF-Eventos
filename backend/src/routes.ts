import { Router } from 'express';
import multer from 'multer';


import { CreateWebUserController } from './controllers/webUser/CreateWebUserController';
import { AuthWebUserController } from './controllers/webUser/AuthWebUserController';
import { DetailWebUserController } from './controllers/webUser/DetailWebUserController';
import { UpdateWebUserController } from './controllers/webUser/UpdateWebuserController';
import { GetAllUsersController } from './controllers/webUser/GetAllUsersController';
import { UserAlreadyExistsController } from './controllers/webUser/UserAlreadyExistsController';
import { GetUserDataByIdController } from './controllers/webUser/GetUserDataByIdController';

import { CreateAppUserController } from './controllers/appUser/CreateAppUserController';
import { UpdateAppUserController } from './controllers/appUser/UpdateAppUserController';

import { CreateEventoController } from './controllers/evento/CreateEventoController';
import { UpdateEventoController } from './controllers/evento/UpdateEventoController';
import { DeleteEventoController } from './controllers/evento/DeleteEventoController';
import { ListEventoController } from './controllers/evento/ListEventoController';

import { CreateAtividadeController } from './controllers/atividades/CreateAtividadeController';
import { DeleteAtividadeController } from './controllers/atividades/DeleteAtividadeController';
import { SearchAllAtividadesController } from './controllers/atividades/ListAtividadesByEventIdController';
import { UpdateAtividadeController } from './controllers/atividades/UpdateAtividadeController';

import { CreateColaboradorController } from './controllers/colaboradores/CreateColaboradorController'

import { CreateInscricoesController } from './controllers/inscricoes/CreateInscricoesController';
import { RemoveInscricaoController } from './controllers/inscricoes/RemoveInscricaoController';
import { ShowInscritosByAtividadeController } from './controllers/inscricoes/ShowInscritosByAtividadeController';

import uploadConfig from './config/multer'




const router = Router();

//Upload de imagem
const upload = multer(uploadConfig.upload("./tmp"));

//User web
router.post('/user', new CreateWebUserController().handle);

router.post('/session', new AuthWebUserController().handle);

router.get('/me', new DetailWebUserController().handle);

router.get('/users', new GetAllUsersController().handle);

router.get('/user', new GetUserDataByIdController().handle);

router.post('/check-email', new UserAlreadyExistsController().handler);

router.put('/user', new UpdateWebUserController().handle);

//User app

router.post('/app/user', new CreateAppUserController().handle);

router.put('/app/user', new UpdateAppUserController().handle);

//Evento

router.post('/eventos', new CreateEventoController().handle)

router.get('/eventos', new ListEventoController().handle);

router.put('/evento', new UpdateEventoController().handle);

router.delete('/evento', new DeleteEventoController().handle);

//Atividades

router.post('/atividades', upload.single('file'), new CreateAtividadeController().handle);

router.delete('/atividades', new DeleteAtividadeController().handle);

router.get('/evento/atividades', new SearchAllAtividadesController().handle);

router.put('/atividades', upload.single('file'), new UpdateAtividadeController().handle);

//colaboradores das atividades

router.post('/colaborador', new CreateColaboradorController().handle);

//Inscrições

router.post('/inscrever', new CreateInscricoesController().handle)

router.delete('/inscrever', new RemoveInscricaoController().handle);

router.get('/inscricoes', new ShowInscritosByAtividadeController().handle)



export { router };