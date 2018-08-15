import { Request, Response, Router } from 'express';
import { getById } from '../services/map';

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const map = await getById(id);
    return res.send(map);
});

export const MapController: Router = router;
