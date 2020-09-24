import { Request, Response, NextFunction } from 'express';

export const error500 = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({
        succes: false,
        message: '500 - INTERNAL SERVER ERROR',
    });
};