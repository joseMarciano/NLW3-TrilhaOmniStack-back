
import express from 'express';
import './database/connection'; // importando o arquivo de conexão do DB para o server

import {getRepository} from 'typeorm'; // typeorm utiliza o pattern 'repositoryPattern' que diz que toda operação feita passa por um repositório... o repositório detem a regra de como o dado pode ser criado,deletado etc..
import Orphanages from './models/Orphanage'; //pegando a entidade 

const app = express(); //criando a aplicação 
app.use(express.json());//express por padrão não entende json então eu faço com que ele interprete json com a função express.json()

app.post('/orphanages', async(request,response) =>{
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

    return response.json({message:"Hello"});
});


app.listen(3333);