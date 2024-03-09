
export interface IRoot {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface ICreateRoot {
    name: string;
    email: string;
    password: string;
}

export interface IRootRepository {
    create: ({ name, email, password }: ICreateRoot) => Promise<string>
    findByEmail: (email: string) => Promise<IRoot | null>
}