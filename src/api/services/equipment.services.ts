import { inject, injectable } from "inversify";
import { IEquipmentRepository, IEquipmentServices } from "../interfaces/equipment.interface";
import { TYPES } from "../types";


@injectable()
export class EquipmentService implements IEquipmentServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.IEquipmentRepository)
    private _remotePositionRepository: IEquipmentRepository;

    /**
     *
     */
    public async getFlotasSecByMainFlot(flotaPrin: number): Promise<any[]> {
        console.log('here')
        let data = await this._remotePositionRepository.getFlotasSecByMainFlot(flotaPrin);
        return data;
    }


}