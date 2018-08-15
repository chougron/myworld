import { Request, Response, Router } from 'express';
import { saveOrReplace, getAll, remove, getById } from '../services/map';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const maps = await getAll();
    return res.send(maps);
});

router.post('/', async (req: Request, res: Response) => {
    const map = await saveOrReplace(req.body);
    return res.send(map);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    await remove(id);
    return res.send(200);
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const map = await getById(id);
    return res.send(map);
});

export const MapController: Router = router;
