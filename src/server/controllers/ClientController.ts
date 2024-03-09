import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';
import { ICreateClient } from '../interfaces/Client';
import { StatusCodes } from 'http-status-codes';


class ClientController {

    private service: ClientService;

    constructor(service: ClientService) {
        this.service = service;
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;
        const result = await this.service.findById(id);

        return res.status(StatusCodes.OK).json(result);
    }

    public async index(req: Request, res: Response) {
        const { email } = req.query;

        const result = await this.service.findAll(email && email.toString());

        return res.status(StatusCodes.OK).json(result);
    }

    public async store(req: Request<{}, {}, ICreateClient>, res: Response) {
        const { name, phone, email, password } = req.body;

        const result = await this.service.create({
            name,
            phone,
            email,
            password
        });

        return res.status(StatusCodes.CREATED).json(result);
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.service.delete(id);

        return res.status(StatusCodes.NO_CONTENT).send();
    }

}

export { ClientController };