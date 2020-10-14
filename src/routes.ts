
import { Router } from 'express'; // pegando o modulo de rotas 
import {getRepository} from 'typeorm'; // typeorm utiliza o pattern 'repositoryPattern' que diz que toda operação feita passa por um repositório... o repositório detem a regra de como o dado pode ser criado,deletado etc..
import Orphanages from './models/Orphanage'; //pegando a entidade 


const routes = Router();

routes.post('/orphanages', async(request,response) =>{
    const { /* desestruturando o body da requisição e m variáveis  */
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    } = request.body;

    const orphanagesRepository = getRepository(Orphanages); // a partir de agora eu tenho os metodos para frazer um CRUD

    const orphanage = orphanagesRepository.create({ // cria o orfanato... mas não salva
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    });

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
});

export default routes; //exportar as rotas e importar no server
