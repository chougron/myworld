import { Request, Response, Router } from 'express';
import { saveOrReplace, getAll } from '../services/map';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const maps = await getAll();
    return res.send(maps);
});

router.post('/', async (req: Request, res: Response) => {
    const map = await saveOrReplace(req.body);
    return res.send(map);
});

export const MapController: Router = router;
