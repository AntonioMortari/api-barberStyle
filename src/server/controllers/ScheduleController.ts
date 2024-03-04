import { Request, Response } from 'express';
import { ScheduleService } from '../services/ScheduleService';
import { StatusCodes } from 'http-status-codes';


class ScheduleController {

    private service: ScheduleService;

    constructor(service: ScheduleService) {
        this.service = service;
    }

    public async store(req: Request, res: Response) {

        const { client_id, date } = req.body;

        const result = await this.service.create({
            date,
            client_id
        });

        return res.status(StatusCodes.CREATED).json(result);

    }

    public async index(req: Request, res: Response) {
        const { date } = req.query;

        const formattedDate = date ? new Date(date.toString()) : new Date();
        const result = await this.service.findAll(formattedDate);

        return res.status(StatusCodes.OK).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;
        await this.service.delete(id);

        return res.status(StatusCodes.NO_CONTENT).send();
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        const { date } = req.body;

        await this.service.update(id, date);

        return res.status(StatusCodes.OK).send();
    }

}

export { ScheduleController };