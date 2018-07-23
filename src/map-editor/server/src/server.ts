import express from 'express';
import { MapController } from './routes';

const app: express.Application = express();

const port: number = parseInt(process.env.PORT) || 8999;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('/maps', MapController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
