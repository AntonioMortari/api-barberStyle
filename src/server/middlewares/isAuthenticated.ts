import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { verify } from '../utils/jwt';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', StatusCodes.UNAUTHORIZED);
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer != 'Bearer') {
        throw new AppError('Bearer token is required', 401);
    }

    const decoded = verify(token);

    req.root_id = decoded;

    next();

};

export { isAuthenticated };