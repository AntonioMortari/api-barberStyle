import { Request, Response, Router } from 'express';
import { ClientPrismaRepository } from '../repositories/Client/ClientPrismaRepository';
import { SchedulePrimaRepository } from '../repositories/Schedule/SchedulePrismaRepository';
import { ScheduleService } from '../services/ScheduleService';
import { ScheduleController } from '../controllers/ScheduleController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { createScheduleValidation, getAllScheduleValidation } from '../validations/Schedules';

const router: Router = Router();

// controller
const clientRepository = new ClientPrismaRepository();
const scheduleRepository = new SchedulePrimaRepository();
const scheduleService = new ScheduleService(scheduleRepository, clientRepository);
const scheduleController = new ScheduleController(scheduleService);

router.get('/', isAuthenticated, getAllScheduleValidation, async (req: Request, res: Response) => {
    await scheduleController.index(req, res);
});

router.post('/', createScheduleValidation, async (req: Request, res: Response) => {
    await scheduleController.store(req, res);
});

router.delete('/:id', isAuthenticated, async (req: Request, res: Response) => {
    await scheduleController.destroy(req, res);
});

router.put('/:id', isAuthenticated, async (req: Request, res: Response) => {
    await scheduleController.edit(req, res);
});


export { router as scheduleRoutes };