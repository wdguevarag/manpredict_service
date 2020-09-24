import { Request, Response } from 'express';
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { VERSION } from "../../config/constants/version";
import { ApiHttpController } from "../../config/helpers/api_http.controller";
import { IEquipmentPositionServices } from "../interfaces";
import { TYPES } from "../types";

@controller(`${VERSION.V1}/equipments_position`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class EquipmentPositionController extends ApiHttpController {

    @inject(TYPES.SERVICES.IEquipmentPositionServices)
    private _equipmentPositionServices: IEquipmentPositionServices;

    @httpGet('')
    public async getFindAllEquipmentsPosition(req: Request, res: Response) {
        const equipmentsPositon = await this._equipmentPositionServices.findAll();
        return res.ok({
            positions: equipmentsPositon,
        });
    }
}