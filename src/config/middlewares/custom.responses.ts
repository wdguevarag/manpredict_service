import { Request, Response, NextFunction, request } from 'express';
import { addResponse } from '../helpers/add_response';
import { okResponse } from '../responses/ok_result.200';
import { badRequest } from '../responses/bad_request.400';

export const customResponses = (req: Request, res: Response, next: NextFunction) => {

    res.ok = (data: object) => addResponse(req, res, okResponse, data);
    res.badRequest = (error: object) => addResponse(req, res, badRequest, null, error);

    next();
}