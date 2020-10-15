/* Criando um exception handler */

import { ErrorRequestHandler} from 'express'; //Importando uma tipagem padrão para qualquer error handler que eu for criar
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[];
}
// a const errorHandler deve ser sempre do tipo ErrorRequestHandler... sendo assim, os parâmetros da minhas função ja estarão tipados
const errorHandler:ErrorRequestHandler = (error,request,response,next) => {

    //se for um erro de validação vamos retornar o erro de outra maneira
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {}

        error.inner.forEach(error =>{
            errors[error.path] = error.errors;
        });

        return response.status(400).json({
            message: "Validation fails",
            date: new Date(),
            errors
        })
    }

    return response.status(500).json({
        message: "Internal server error",
        date: new Date()
    });
}

export default errorHandler;