import { prisma } from '../../database/prisma';
import { IClient, IClientRepository, ICreateClient } from '../../interfaces/Client';

class ClientPrismaRepository implements IClientRepository {

    public async findAll(email?: string): Promise<IClient[]>{
        const result = await prisma.client.findMany({
            where:{
                email
            }
        });

        return result;
    }

    public async findById(id: string): Promise<IClient | null>{
        const result = await prisma.client.findUnique({
            where:{
                id
            }
        });

        return result;
    }

    public async create({ name, phone, email, password }: ICreateClient): Promise<string> {

        const result = await prisma.client.create({
            data: {
                name,
                phone,
                email,
                password
            }
        });

        return result.id;
    }

    public async findByEmail(email: string): Promise<IClient | null> {
        const result = await prisma.client.findUnique({
            where: {
                email
            }
        });

        return result;
    }

    public async findByPhone(phone: string): Promise<IClient | null> {
        const result = await prisma.client.findUnique({
            where: {
                phone
            }
        });

        return result;
    }

    public async delete(id: string):Promise<void>{
        await prisma.client.delete({
            where:{
                id
            }
        });
    }

}

export { ClientPrismaRepository };