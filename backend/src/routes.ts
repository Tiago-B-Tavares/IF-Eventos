import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';  // Adicionei a importação de 'path'

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
import { CountEventosController } from './controllers/evento/CountEventoController';
import { AddOrganizadorEventoController } from './controllers/evento/AddOrganizadorEventoController';
import { ListEventoController } from './controllers/evento/ListEventoController';

import { GetAppUsersController } from './controllers/appUser/GetAppUsersController';
import { ListAllEventosController } from './controllers/evento/ListAllEventosController';

import { CreateAtividadeController } from './controllers/atividades/CreateAtividadeController';
import { DeleteAtividadeController } from './controllers/atividades/DeleteAtividadeController';
import { ListAtividadesByEventIdController } from './controllers/atividades/ListAtividadesByEventIdController';
import { UpdateAtividadeController } from './controllers/atividades/UpdateAtividadeController';
import { VerificaAtividadesOrganizadorController } from './controllers/atividades/VerificaAtividadesOrganizadorController';

import { UpdateColaboradorController } from './controllers/colaboradores/UpdateColaboradorController';
import { CreateColaboradorAtividadeController } from './controllers/colaboradores/CreateColaboradorAtividadeController';
import { CreateColaboradorEventoController } from './controllers/colaboradores/CreateColaboradorEventoController';

import { CreateInscricoesController } from './controllers/inscricoes/CreateInscricoesController';
import { RemoveInscricaoController } from './controllers/inscricoes/RemoveInscricaoController';
import { ShowInscritosByAtividadeController } from './controllers/inscricoes/ShowInscritosByAtividadeController';

import { ChangeUserPermissionsController } from './controllers/admin/changeUserPermissionsController';

import uploadConfig from './config/multer';

import { logRequestData } from './middlewares/logRequestData';





const router = Router();

// Upload de imagem
const upload = multer(uploadConfig.upload('public/uploads'));


router.put('/permissions', new ChangeUserPermissionsController().handle);

// Web User
router.post('/user', new CreateWebUserController().handle);
router.post('/session', new AuthWebUserController().handle);
router.get('/me', new DetailWebUserController().handle);
router.get('/users', new GetAllUsersController().handle);
router.get('/user', new GetUserDataByIdController().handle);
router.post('/check-email', new UserAlreadyExistsController().handler);
router.put('/user', new UpdateWebUserController().handle);


// App User
router.get('/app/user', new GetAppUsersController().handle);
router.post('/app/user', new CreateAppUserController().handle);
router.put('/app/user', new UpdateAppUserController().handle);

// Evento
router.post('/eventos', new CreateEventoController().handle);
router.get('/count-eventos', new CountEventosController().handle);
router.get('/eventos', new ListEventoController().handle);
router.get('/todos-eventos', new ListAllEventosController().handle);
router.put('/evento', new UpdateEventoController().handle);
router.delete('/evento', new DeleteEventoController().handle);
router.post('/add-organizador-evento', new AddOrganizadorEventoController().handle);

// Atividades
router.post('/atividades', new CreateAtividadeController().handle);
router.delete('/atividades', new DeleteAtividadeController().handle);
router.get('/evento/atividades', new ListAtividadesByEventIdController().handle); 
router.put('/atividades', new UpdateAtividadeController().handle);
router.get('/hasAtividades', new VerificaAtividadesOrganizadorController().handle)

// Colaboradores das atividades
router.post('/colaborador', new CreateColaboradorAtividadeController().handle);
router.post('/colaborador-evento', new CreateColaboradorEventoController().handle);
router.put('/colaborador', new UpdateColaboradorController().handle);

// Inscrições
router.post('/inscrever', new CreateInscricoesController().handle);
router.delete('/inscrever', new RemoveInscricaoController().handle);
router.get('/inscricoes', new ShowInscritosByAtividadeController().handle);


router.use('/files', express.static(path.join(__dirname, '..', 'public/uploads')));  

export { router };
