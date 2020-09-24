import { BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../../api/types';
import { ILang } from '../../lang/lang';

export class ApiHttpController extends BaseHttpController {
    @inject(TYPES.LANG)
    protected lang: ILang;
}