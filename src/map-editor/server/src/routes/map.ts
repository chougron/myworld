import { Request, Response, Router } from 'express';
import Database from '../database';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const database = await Database.getInstance();
    await database.collection('maps').insertOne({ id: 1, name: 'Map 1', data: 'Blabla' });

    const maps = await database
        .collection('maps')
        .find()
        .toArray();

    console.log(maps);

    res.send('Got a POST request');
});

export const MapController: Router = router;
