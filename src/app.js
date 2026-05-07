// src/app.js
import express from 'express';
import cors from 'cors';
//import path from 'path';
//import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import { errorMiddleware } from './core/middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Servir arquivos estáticos da pasta uploads
// Obtenha o diretório atual usando import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use('/arquivos', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);

app.use(errorMiddleware);

export default app;
