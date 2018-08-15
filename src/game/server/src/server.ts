import express from 'express';
import { MapController } from './routes';

const app: express.Application = express();

const port: number = parseInt(process.env.PORT) || 9888;

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use('/maps', MapController);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
