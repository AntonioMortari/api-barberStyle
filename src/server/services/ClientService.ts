import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IClientRepository, ICreateClient } from '../interfaces/Client';

import { hash } from '../utils/encrypt';

class ClientService {

    private repository: IClientRepository;

    constructor(repository: IClientRepository) {
        this.repository = repository;
    }

    public async findById(id: string){
        const result = await this.repository.findById(id);

        if(!result){
            throw new AppError(`User with id ${id} not found`, StatusCodes.NOT_FOUND);
        }

        return result;
    }

    public async create({ name, phone, email, password }: ICreateClient) {

        if (await this.repository.findByEmail(email)) {
            throw new AppError(`Client with email ${email} exists`, StatusCodes.BAD_REQUEST);
        }

        if (await this.repository.findByPhone(phone)) {
            throw new AppError(`Client with phone ${phone} exists`, StatusCodes.BAD_REQUEST);
        }

        return await this.repository.create({
            name,
            phone,
            email,
            password: await hash(password)
        });

    }

}

export { ClientService };