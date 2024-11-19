import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { useRoutes } from './routes/index';
import bodyParser from 'body-parser';
import { createTables } from './services/db';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
useRoutes(app);

createTables()
    .then(() => {
        console.log('Tabelas criadas ou já existentes.');
        app.listen(PORT, () => console.log('Servidor iniciado na porta ' + PORT));
    })
    .catch((err) => {
        console.error('Erro ao criar tabelas:', err);
    });
