import { AppError } from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (
    error: Error & Partial<AppError>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {

    console.log(error);

    const message = typeof error.getStatusCode == 'function' ? error.message : 'Internal Server Error';
    const status =  typeof error.getStatusCode == 'function' ? error.getStatusCode() : StatusCodes.INTERNAL_SERVER_ERROR;

    return res.status(status).json({
        error:{
            status,
            message,
            timestamp: new Date(),
            path: req.path
        }
    });

};

export { errorMiddleware };