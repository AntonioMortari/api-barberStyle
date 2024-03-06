import { Request, Response, Router } from 'express';
import { ClientPrismaRepository } from '../repositories/Client/ClientPrismaRepository';
import { ClientService } from '../services/ClientService';
import { ClientController } from '../controllers/ClientController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router: Router = Router();

// controller
const clientRepository = new ClientPrismaRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

router.get('/:id', async (req: Request, res: Response) => {
    await clientController.show(req,res);
});

router.post('/', async (req: Request, res: Response) => {
    await clientController.store(req,res);
});

router.delete('/:id', isAuthenticated, async(req: Request,res: Response) => {
    await clientController.destroy(req,res);
});

export { router as clientRoutes };