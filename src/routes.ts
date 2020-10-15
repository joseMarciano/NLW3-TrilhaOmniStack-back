
import { Router } from 'express'; // pegando o modulo de rotas 
import OrphanagesController from './controllers/OrphanagesController'; // pegando a controller
const routes = Router();

routes.post('/orphanages',OrphanagesController.create);
routes.get('/orphanages',OrphanagesController.listAll);
export default routes; //exportar as rotas e importar no server
