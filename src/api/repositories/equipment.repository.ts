import { injectable } from "inversify";
import { SupportLang } from '../../config/helpers/support_lang';
import { IEquipmentRepository } from '../interfaces/equipment.interface';
import Equipment from "../models/entity/public/Equipment.model";
import FlotaSec from '../models/entity/public/FlotaSec.model';


@injectable()
export class EquipmentRepository extends SupportLang implements IEquipmentRepository {

    /**
    * 
    */
    public async getFlotasSecByMainFlot(flotaPri: number): Promise<any[]> {

        let flotasSec = await FlotaSec.findAll({
            where: {
                id_flota_pr: flotaPri,
                tiem_elimin: null
            },
            include: [
                {
                    model: Equipment,
                    as: 'equipments'
                }
            ]
        })

        return flotasSec;

    }

}