
import { Router } from 'express'; // pegando o modulo de rotas 
import OrphanagesController from './controllers/OrphanagesController'; // pegando a controller
import multer from 'multer';
import uploadConfing from './config/upload';

const routes = Router();
const upload = multer(uploadConfing); // passando a configuração do multer 

                        //usando o upload.array passando o nome que eu espero receber no request
routes.post('/orphanages',upload.array('images'),OrphanagesController.create);
routes.get('/orphanages',OrphanagesController.listAll);
routes.get('/orphanages/:id',OrphanagesController.find);
export default routes; //exportar as rotas e importar no server
