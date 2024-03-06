import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import jwt from 'jsonwebtoken';

interface IJwtData {
    sub: string;
    expiresIn: string;
}

const SECRET_JWT = process.env.SECRET_JWT;

const sign = ({ sub, expiresIn }: IJwtData): string => {

    if (!SECRET_JWT) {
        throw new AppError('Secret key is missing!', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const token = jwt.sign({sub}, SECRET_JWT, { expiresIn });

    return token;

};

const verify = (token: string) => {
    if (!SECRET_JWT) {
        throw new AppError('JWT Secret is missing', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    try {
        const decoded = jwt.verify(token, SECRET_JWT);

        if(typeof decoded.sub == 'string'){
            return decoded.sub;
        }

        throw new AppError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
    } catch (error) {
        throw new AppError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
    }
};
export { sign, verify };