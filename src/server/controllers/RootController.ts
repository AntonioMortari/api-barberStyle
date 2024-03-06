import { Request, Response } from 'express';
import { RootService } from '../services/RootService';
import { ICreateRoot } from '../interfaces/Root';
import { StatusCodes } from 'http-status-codes';

class RootController {

    private service: RootService;

    constructor(service: RootService) {
        this.service = service;
    }

    public async store(req: Request<{}, {}, ICreateRoot>, res: Response) {
        const { name, email, password } = req.body;

        const result = await this.service.create({
            name,
            email,
            password
        });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async auth(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await this.service.auth(email,password);

        return res.status(StatusCodes.OK).json({
            token: result
        });
    }

}

export { RootController };