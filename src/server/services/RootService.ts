
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { ICreateRoot, IRootRepository } from '../interfaces/Root';
import { compare, hash } from '../utils/encrypt';
import { sign } from '../utils/jwt';

class RootService {

    private repository: IRootRepository;

    constructor(repository: IRootRepository) {
        this.repository = repository;
    }

    public async create({ name, email, password }: ICreateRoot) {

        if (await this.repository.findByEmail(email)) {
            throw new AppError(`User with email ${email} exists`, StatusCodes.BAD_REQUEST);
        }

        return await this.repository.create({
            name,
            email,
            password: await hash(password)
        });

    }

    public async auth(email: string, password: string) {

        const findUser = await this.repository.findByEmail(email);

        if (!findUser) {
            throw new AppError('Email or password incorrect', StatusCodes.UNAUTHORIZED);
        }

        if (!await compare(password, findUser.password)) {
            throw new AppError('Email or password incorrect', StatusCodes.UNAUTHORIZED);
        }

        const token = sign({sub: findUser.id, expiresIn: '24h'});

        return token;

    }

}

export { RootService };