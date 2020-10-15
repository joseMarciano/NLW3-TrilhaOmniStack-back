
import {Request,Response} from 'express'; // importando o tipo de request e response para usar no create... como estou usando o typeScript e essa função está em outra pasta, não tem como saber o que vai chegar em request e response, por isso usamos a tipagem
import {getRepository} from 'typeorm'; // typeorm utiliza o pattern 'repositoryPattern' que diz que toda operação feita passa por um repositório... o repositório detem a regra de como o dado pode ser criado,deletado etc..
import Orphanages from '../models/Orphanage'; //pegando a entidade 
import orphanageView from '../views/orphanages_view';
export default {

    async listAll(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanages);

        const orphanages = await orphanagesRepository.find({
            relations: ['images'] // para retornar as imagens tbm, já que é um relacionamento
        });
        return response.json(orphanageView.renderMany(orphanages));
    },
    async find(request: Request, response: Response){

        const {id} = request.params; // pega o id no parametro da requisição
        const orphanagesRepository = getRepository(Orphanages);

        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });
        return response.json(orphanageView.render(orphanage));
    },
    async create(request: Request,response: Response){
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
    

        const requestImages = request.files as Express.Multer.File[]; // pegando as imagens no corpo da requisição
        const images = requestImages.map(image =>{
             return {path:image.filename};
        });

        const orphanage = orphanagesRepository.create({ // cria o orfanato... mas não salva
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
}