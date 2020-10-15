
import express from 'express';
import 'express-async-errors';
import './database/connection'; // importando o arquivo de conexão do DB para o server
import path from 'path'; 
import routes from './routes'
import errorHandler from './errors/handler';
import cors from 'cors'

const app = express(); //criando a aplicação 

app.use(cors()); //evitando erro CORS
app.use(express.json());//express por padrão não entende json então eu faço com que ele interprete json com a função express.json()
app.use(routes);
app.use('/uploads',express.static(path.join(__dirname, '..', 'uploads'))); // aplicando os endereços das imagens no servidor para eu poder acessar
app.use(errorHandler);
app.listen(3333);