import { prisma } from '../../database/prisma';
import { IRootRepository, ICreateRoot, IRoot } from '../../interfaces/Root';

class RootPrismaRepository implements IRootRepository {

    public async create({ name, email, password }: ICreateRoot): Promise<string> {
        const result = await prisma.root.create({
            data: {
                name,
                email,
                password
            }
        });

        return result.id;
    }

    public async findByEmail(email: string): Promise<IRoot | null> {
        return await prisma.root.findFirst({
            where: {
                email
            }
        });
    }

}

export { RootPrismaRepository };