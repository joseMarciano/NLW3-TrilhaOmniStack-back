
import { Router } from 'express'; // pegando o modulo de rotas 
import OrphanagesController from './controllers/OrphanagesController'; // pegando a controller
const routes = Router();

routes.post('/orphanages',OrphanagesController.create);
routes.get('/orphanages',OrphanagesController.listAll);
routes.get('/orphanages/:id',OrphanagesController.find);
export default routes; //exportar as rotas e importar no server
