import { endOfDay, startOfDay } from 'date-fns';
import { prisma } from '../../database/prisma';
import { ICreateSchedule, ISchedule, IScheduleRepository } from '../../interfaces/Schedule';


class SchedulePrimaRepository implements IScheduleRepository {

    public async create({ date, client_id }: ICreateSchedule): Promise<string> {
        const result = await prisma.schedule.create({
            data:{
                date,
                client_id
            }
        });

        return result.id;
    }

    public async findByDate(date: Date): Promise<ISchedule | null>{
        return await prisma.schedule.findFirst({
            where:{
                date
            }
        });
    }

    public async findById(id: string): Promise<ISchedule | null>{
        return await prisma.schedule.findUnique({
            where:{
                id
            }
        });
    }

    public async findAll(date: Date): Promise<ISchedule[]>{

        const result = await prisma.schedule.findMany({
            where:{
                date:{
                    gte: startOfDay(date),
                    lt: endOfDay(date)
                }
            },
            orderBy: {
                date: 'asc'
            }
        });

        return result;
    }

    public async delete(id: string): Promise<void>{
        await prisma.schedule.delete({
            where:{
                id
            }
        });
    }

    public async update(id: string, date: Date): Promise<void>{
        await prisma.schedule.update({
            where:{
                id
            },
            data:{
                date
            }
        });
    }

}

export { SchedulePrimaRepository };