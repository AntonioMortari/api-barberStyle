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

}

export { ClientController };