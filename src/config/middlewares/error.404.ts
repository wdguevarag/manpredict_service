import { Request, Response } from 'express';

export const error404 = (request: Request, response: Response) => {
    return response.status(404).send({
        succes: false,
        message: '404 - Page or API Not Found',
    });
};