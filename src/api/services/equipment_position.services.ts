import { inject, injectable } from "inversify";
import { IEquipmentPositionRepository, IEquipmentPositionServices } from "../interfaces";
import { TYPES } from "../types";


@injectable()
export class EquipmentPositionService implements IEquipmentPositionServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.IEquipmentPositionRepository)
    private _remotePositionRepository: IEquipmentPositionRepository;

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const postionEquipmentPosition = await this._remotePositionRepository.findAll();
        return postionEquipmentPosition;
    }


}