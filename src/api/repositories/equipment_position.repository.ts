import { injectable } from "inversify";
import { SupportLang } from "../../config/helpers/support_lang";
import { IEquipmentPositionRepository } from '../interfaces';
import { EquipmentsPositonEntityView } from "../models/entity/views/equipments_position";


@injectable()
export class EquipmentPositionRepository extends SupportLang implements IEquipmentPositionRepository {

    /**
     * 
     */
    public async findAll(): Promise<any[]> {
        let equipments = await EquipmentsPositonEntityView.findAll();
        return equipments;
    }


}
