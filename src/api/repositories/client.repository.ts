import { injectable } from 'inversify';
import { SupportLang } from '../../config/helpers/support_lang';
import { IClientRepository } from '../interfaces/client.interface';
import Client from '../models/entity/public/Client.model';
import FlotaSec from '../models/entity/public/FlotaSec.model';
import { TpsConfigurationEntityView } from '../models/entity/views/tps_configuration';


@injectable()
export class ClientRepository extends SupportLang implements IClientRepository {

    /**
    *
    */
    public async findAll(): Promise<any[]> {
        const client = await Client.findAll();
        return client;
    }

}
