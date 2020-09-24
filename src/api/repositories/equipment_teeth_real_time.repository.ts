import { injectable } from 'inversify';
import { SupportLang } from '../../config/helpers/support_lang';
import { IEquipmentsTeethRealTimeRepository } from '../interfaces';
import { EquipmentsTeethRealTimeEntityView } from '../models/entity/views/equipments_teeth_real_time';


@injectable()
export class EquipmentsTeethRealTimeRepository extends SupportLang implements IEquipmentsTeethRealTimeRepository {

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const equipmentsTeeth = await EquipmentsTeethRealTimeEntityView.findAll();
        return equipmentsTeeth;
    }


}
