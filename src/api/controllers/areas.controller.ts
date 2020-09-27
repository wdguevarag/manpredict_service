import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { VERSION } from '../../config/constants/version';
import { ApiHttpController } from '../../config/helpers/api_http.controller';
import { IAreaServices } from '../interfaces';
import { TYPES } from '../types';

@controller(`${VERSION.V1}/areas`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class AreaController extends ApiHttpController {

    @inject(TYPES.SERVICES.IAreaServices)
    private _clientServices: IAreaServices;

    @httpGet('')
    public async getFindAllArea(req: Request, res: Response) {

        const clientFilter = Number(req.query.clientId);

        const tpsConfig = await this._clientServices.findAll(clientFilter);

        return res.ok({
            clients: tpsConfig,
        });
    }
}
