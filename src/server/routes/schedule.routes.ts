import { Request, Response, Router } from 'express';
import { ClientPrismaRepository } from '../repositories/Client/ClientPrismaRepository';
import { SchedulePrimaRepository } from '../repositories/Schedule/SchedulePrismaRepository';
import { ScheduleService } from '../services/ScheduleService';
import { ScheduleController } from '../controllers/ScheduleController';

const router: Router = Router();

// controller
const clientRepository = new ClientPrismaRepository();
const scheduleRepository = new SchedulePrimaRepository();
const scheduleService = new ScheduleService(scheduleRepository, clientRepository);
const scheduleController = new ScheduleController(scheduleService);

router.get('/', async (req: Request, res: Response) => {
    await scheduleController.index(req,res);
});

router.post('/', async (req: Request, res: Response) => {
    await scheduleController.store(req,res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await scheduleController.destroy(req,res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await scheduleController.edit(req,res);
});


export { router as scheduleRoutes };