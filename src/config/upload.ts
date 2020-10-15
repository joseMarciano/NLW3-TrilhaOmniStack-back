import multer from 'multer'; // npm install multer (Fazer o gerenciamento de upload de imagens)
import path from 'path'; // utilizando o path para trabalhar com diretórios(opcional)
export default { // exportas as configuarações 
    storage: multer.diskStorage({//armazenar as imagens no disco(tem varias opções como salvar na AWS etc...)
                               //nome da pasta atual    volta uma pasta     volta outra pasta       chega na pasta uploads
        destination: path.join(  __dirname,             '..',                     '..',                     'uploads'),
        
        //recebe o request do express, o aquivo e a função de callBack
        filename: (request,file,cb) =>{ // a responsabilidade dessa função é dar um nome para nosso arquivo
            const fileName = `${Date.now()}-${file.originalname}`;

            // o valor null é pq o primeiro parâmetro deve ser um erro... mas no posso colocar null já que é pouco provável que dê erro na nomeação do arquivo
            cb(null,fileName); // chamando o callBack
        }
    }) 
};