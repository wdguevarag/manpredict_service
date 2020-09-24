import { Request, Response } from 'express';

export type httpResponse = {
    status: number;
    content: object;
}

export const addResponse = (req: Request, res: Response, callbak: Function, success?: any, error?: any): any => {
    const result: any = callbak(success ? success : error);
    return res.status(result.status).json(result.content);
}