import { injectable } from 'inversify';
import { SupportLang } from '../../config/helpers/support_lang';
import { ITpsConfigurationRepository } from '../interfaces';
import { TpsConfigurationEntityView } from '../models/entity/views/tps_configuration';


@injectable()
export class TpsConfigurationRepository extends SupportLang implements ITpsConfigurationRepository {

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const tpsConfiguration = await TpsConfigurationEntityView.findAll();
        return tpsConfiguration;
    }


}
