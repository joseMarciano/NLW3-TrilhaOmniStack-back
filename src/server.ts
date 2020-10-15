
import express from 'express';
import './database/connection'; // importando o arquivo de conexão do DB para o server
import path from 'path'; 
import routes from './routes'

const app = express(); //criando a aplicação 
app.use(express.json());//express por padrão não entende json então eu faço com que ele interprete json com a função express.json()
app.use(routes);
app.use('/uploads',express.static(path.join(__dirname, '..', 'uploads'))); // aplicando os endereços das imagens no servidor para eu poder acessar

app.listen(3333);