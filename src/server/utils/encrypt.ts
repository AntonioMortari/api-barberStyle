import bcrypt from 'bcrypt';

const SALT = 10;

const hash = async (password: string): Promise<string> => {
    const hashPassword = await bcrypt.hash(password, SALT);

    return hashPassword;
};

const compare = async(password: string, encryptPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, encryptPassword);

    return match;
};

export { hash, compare };