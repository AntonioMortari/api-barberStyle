

export interface ISchedule {
    id: string;
    date: Date;
    client_id: string;
}

export interface ICreateSchedule {
    date: Date;
    client_id: string;
}

export interface IScheduleRepository {
    create: ({ date, client_id }: ICreateSchedule) => Promise<string>
    findByDate: (date: Date) => Promise<ISchedule | null>
    findById: (id: string) => Promise<ISchedule | null>
    findAll: (date: Date) => Promise<ISchedule[]>
    delete: (id: string) => Promise<void>
    update: (id: string, date: Date) => Promise<void>
}