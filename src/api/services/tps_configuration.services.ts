import { inject, injectable } from 'inversify';
import { ITpsConfigurationRepository, ITpsConfigurationServices } from '../interfaces';
import { TYPES } from '../types';


@injectable()
export class TpsConfigurationServices implements ITpsConfigurationServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.ITpsConfigurationRepository)
    private _tpsConfigurationRepository: ITpsConfigurationRepository;

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const tpsConfiguration = await this._tpsConfigurationRepository.findAll();
        return tpsConfiguration;
    }


}
