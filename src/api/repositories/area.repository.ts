import { injectable } from 'inversify';
import { SupportLang } from '../../config/helpers/support_lang';
import { IAreaRepository } from '../interfaces/area.interface';
import Area from '../models/entity/public/Area.model';


@injectable()
export class AreaRepository extends SupportLang implements IAreaRepository {

    /**
    *
    */
    public async findAll(clientId:number): Promise<any[]> {
        const area = await Area.findAll({
            where: {
                clientId,
            },
        })
        return area;
    }

}
