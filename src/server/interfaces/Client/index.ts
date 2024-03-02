

export interface IClient {
    id: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface ICreateClient {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface IClientRepository {
    create: ({ name, phone, email, password }: ICreateClient) => Promise<string>
    findById: (id: string) => Promise<IClient | null>
    findByEmail: (email: string) => Promise<IClient | null>
    findByPhone: (phone: string) => Promise<IClient | null>
}