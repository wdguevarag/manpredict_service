import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { VERSION } from '../../config/constants/version';
import { ApiHttpController } from '../../config/helpers/api_http.controller';
import { IClientServices } from '../interfaces';
import { TYPES } from '../types';

@controller(`${VERSION.V1}/clients`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class ClientController extends ApiHttpController {

    @inject(TYPES.SERVICES.IClientServices)
    private _clientServices: IClientServices;

    @httpGet('')
    public async getFindAllClient(req: Request, res: Response) {

        const tpsConfig = await this._clientServices.findAll();

        return res.ok({
            clients: tpsConfig,
        });
    }
}
