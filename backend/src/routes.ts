import { Router, Request, Response } from 'express'
import { CreateOrganizadorController } from './controllers/organizador/CreateOrganizadorcontroller'; 

const router = Router();

router.post('/organizador_user', new CreateOrganizadorController().handle)

export { router };