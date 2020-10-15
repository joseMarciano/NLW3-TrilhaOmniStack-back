
import {Request,Response} from 'express'; // importando o tipo de request e response para usar no create... como estou usando o typeScript e essa função está em outra pasta, não tem como saber o que vai chegar em request e response, por isso usamos a tipagem
import {getRepository} from 'typeorm'; // typeorm utiliza o pattern 'repositoryPattern' que diz que toda operação feita passa por um repositório... o repositório detem a regra de como o dado pode ser criado,deletado etc..
import Orphanages from '../models/Orphanage'; //pegando a entidade 
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';
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

        const data = {            
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };
        const schema = Yup.object().shape({ // quais os tipos de dados esperados em cada propriedade
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array( //images é um array de objetos e eu também faço a validação dentro do array
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        //Fazendo a validação 
        await schema.validate(data,{
            abortEarly: false /* retornando todos os erros, sem essa propriedade, 
                                 é retornado o erro de forma antecipada, ou seja, 
                                 o primeiro erro encontrado já vai ser barrado na validação.
                                 Dessa forma se tenho 4 campos invalidos, será retornado os 4 campos invalidos e não somente o primeiro
                                */
        })

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage);
    }
}