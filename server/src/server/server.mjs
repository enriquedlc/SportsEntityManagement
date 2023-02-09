import express from 'express';
import { createServer } from 'http';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import actorRouter from '../routers/actor.router.mjs'
import { SERVER_PORT } from '../config/config.mjs';

const app = express();

app.use(express.json())

app.disable('x-powered-by');
app.disable('etag');
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/api/sportsentity', (req, res) => {
    return res.send({
        error: false,
        message: 'Welcome to "Build Restful CRUD API in Node with Exress and MySQL"',
        written_by: 'Enrique De La Concepción',
        published_on: 'https://accesodatos.dev'
    })
})

app.use('/api/sportsentity', actorRouter)

//crear el server
const server = createServer(app);

const runServer = () => {
    server.listen(SERVER_PORT, () => {
        console.log(
            `Server started on port http://localhost:${server.address().port}`
        );
    })
}
const stopServer = () => {
    console.log(`Closing server...`);
    server.close();
}

export { runServer, stopServer }