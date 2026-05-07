import express from 'express';

import app from './src/app.js';

const server = express();

server.use(app);

const PORT = 3031; 
app.listen(PORT,()=>{
    console.log(
        `API: Rodando - PORT: ${PORT}`,
        `Link de acesso local: http://localhost:${PORT}/`
    );
});
