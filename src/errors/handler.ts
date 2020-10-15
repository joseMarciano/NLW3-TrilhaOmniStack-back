/* Criando um exception handler */

import { ErrorRequestHandler} from 'express'; //Importando uma tipagem padrão para qualquer error handler que eu for criar

// a const errorHandler deve ser sempre do tipo ErrorRequestHandler... sendo assim, os parâmetros da minhas função ja estarão tipados
const errorHandler:ErrorRequestHandler = (error,request,response,next) => {
    console.log(error);

    return response.status(500).json({
        message: "Internal server error",
        date: new Date()
    });
}

export default errorHandler;