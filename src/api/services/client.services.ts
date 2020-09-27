import { inject, injectable } from 'inversify';
import { IClientRepository, IClientServices } from '../interfaces';
import { TYPES } from '../types';


@injectable()
export class ClientServices implements IClientServices {


    /**
     *
     */
    @inject(TYPES.REPOSITORIES.IClientRepository)
    private _clientRepository: IClientRepository;

    /**
     *
     */
    public async findAll(): Promise<any[]> {
        const tpsConfiguration = await this._clientRepository.findAll();
        return tpsConfiguration;
    }


}
