import { inject, injectable } from 'inversify';
import { IEquipmentsTeethRealTimeRepository, IEquipmentsTeethRealTimeServices } from '../interfaces';
import { TYPES } from '../types';


@injectable()
export class EquipmentsTeethRealTimeServices implements IEquipmentsTeethRealTimeServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.IEquipmentsTeethRealTimeRepository)
    private _equipmentsTeethRealTimeRepository: IEquipmentsTeethRealTimeRepository;

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const equipmentsTeethRealTime = await this._equipmentsTeethRealTimeRepository.findAll();
        return equipmentsTeethRealTime;
    }


}
