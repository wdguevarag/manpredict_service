import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { VERSION } from '../../config/constants/version';
import { ApiHttpController } from '../../config/helpers/api_http.controller';
import { ITpsConfigurationServices } from '../interfaces';
import { TYPES } from '../types';

@controller(`${VERSION.V1}/tps_configuration`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class TpsConfigurationController extends ApiHttpController {

    @inject(TYPES.SERVICES.ITpsConfigurationServices)
    private _tpsConfigurationServices: ITpsConfigurationServices;

    @httpGet('')
    public async getFindAllTpsConfiguration(req: Request, res: Response) {

        const tpsConfig = await this._tpsConfigurationServices.findAll();

        return res.ok({
            positions: tpsConfig,
        });
    }
}
