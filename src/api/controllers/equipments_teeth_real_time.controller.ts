import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { VERSION } from '../../config/constants/version';
import { ApiHttpController } from '../../config/helpers/api_http.controller';
import { IEquipmentsTeethRealTimeServices } from '../interfaces';
import { TYPES } from '../types';

@controller(`${VERSION.V1}/equipments_teeth_real_time`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class EquipmentsTeethRealTimeController extends ApiHttpController {

    @inject(TYPES.SERVICES.IEquipmentsTeethRealTimeServices)
    private _equipmentsTeethRealTimeServices: IEquipmentsTeethRealTimeServices;

    @httpGet('')
    public async getFindAllEquipmentsTeethRealTime(req: Request, res: Response) {

        const equipmentsTeethRealTime = await this._equipmentsTeethRealTimeServices.findAll();

        return res.ok({
            positions: equipmentsTeethRealTime,
        });
    }
}
