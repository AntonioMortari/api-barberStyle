import { Request, Response, Router } from 'express';
import { RootPrismaRepository } from '../repositories/Root/RootPrismaRepository';
import { RootService } from '../services/RootService';
import { RootController } from '../controllers/RootController';
import { createRootValidation } from '../validations/Root';

const router: Router = Router();

// controller
const rootRepository = new RootPrismaRepository();
const rootService = new RootService(rootRepository);
const rootController = new RootController(rootService);

router.post('/', createRootValidation, async (req: Request, res: Response) => {
    await rootController.store(req, res);
});

router.post('/auth', async (req: Request, res: Response) => {
    await rootController.auth(req, res);
});

export { router as rootRoutes };