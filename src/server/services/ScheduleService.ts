import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { IClientRepository } from '../interfaces/Client';
import { ICreateSchedule, IScheduleRepository } from '../interfaces/Schedule';
import { addMinutes, getHours, isBefore, startOfHour } from 'date-fns';

class ScheduleService {

    private repository: IScheduleRepository;
    private clientRepository: IClientRepository;

    constructor(repository: IScheduleRepository, clientRepository: IClientRepository) {
        this.repository = repository;
        this.clientRepository = clientRepository;
    }

    public async create({ date, client_id }: ICreateSchedule) {

        if (!await this.clientRepository.findById(client_id)) {
            throw new AppError(`Client with id ${client_id} not found`, StatusCodes.NOT_FOUND);
        }

        const formattedDate = new Date(date);

        const time = addMinutes(startOfHour(formattedDate), 20);

        await this.verifyDate(time);

        const result = await this.repository.create({ date, client_id });

        return result;

    }

    public async findAll(date: Date) {
        const result = await this.repository.findAll(date);

        return result;
    }

    public async delete(id: string) {
        if (! await this.repository.findById(id)) {
            throw new AppError('Schedule not found', StatusCodes.NOT_FOUND);
        }

        await this.repository.delete(id);
    }

    public async update(id: string, date: Date) {
        if (! await this.repository.findById(id)) {
            throw new AppError('Schedule not found', StatusCodes.NOT_FOUND);
        }

        await this.verifyDate(date);

        await this.repository.update(id, date);
    }

    private async verifyDate(date: Date) {

        if (isBefore(date, new Date())) {
            throw new AppError('It is not possible to schedule a time that has passed', StatusCodes.BAD_REQUEST);
        }

        if (getHours(date) < 9 || getHours(date) > 19) {
            throw new AppError('Create a schedule between 9am and 19pm', StatusCodes.BAD_REQUEST);
        }

        if (await this.repository.findByDate(date)) {
            throw new AppError('Schedule not avaiable', StatusCodes.BAD_REQUEST);
        }

    }

}

export { ScheduleService };