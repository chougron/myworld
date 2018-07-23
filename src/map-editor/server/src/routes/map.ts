import { Request, Response, Router } from 'express';
import { saveOrReplace } from '../services/map';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    const map = await saveOrReplace(req.body);
    return res.send(map);
});

export const MapController: Router = router;
