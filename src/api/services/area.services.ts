import { inject, injectable } from 'inversify';
import { IAreaRepository, IAreaServices } from '../interfaces';
import { TYPES } from '../types';


@injectable()
export class AreaServices implements IAreaServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.IAreaRepository)
    private _areaRepository: IAreaRepository;

    /**
     *
     */
    public async findAll(clientId:number): Promise<any[]> {
        const tpsConfiguration = await this._areaRepository.findAll(clientId)
        return tpsConfiguration;
    }


}
