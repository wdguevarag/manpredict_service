import { Request, Response } from 'express';
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { VERSION } from "../../config/constants/version";
import { ApiHttpController } from "../../config/helpers/api_http.controller";
import { IEquipmentServices } from '../interfaces/equipment.interface';
import { TYPES } from "../types";

@controller(`${VERSION.V1}/equipment`, TYPES.MIDDLEWARES.SupportLangMiddleware)
export class EquipmentController extends ApiHttpController {

    @inject(TYPES.SERVICES.IEquipmentServices)
    private service: IEquipmentServices;

    @httpGet('/fleet/sec/:fleetMain')
    public async getFleetSecByFleetMain(req: Request, res: Response) {


        let { fleetMain } = req.params
        let data = await this.service.getFlotasSecByMainFlot(Number(fleetMain))
        return res.json({ data })

    }
}