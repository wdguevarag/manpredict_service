import { inject, injectable } from 'inversify';
import { TYPES } from '../../api/types';
import { ILang } from '../../lang/lang';

@injectable()
export class SupportLang {
    @inject(TYPES.LANG)
    protected lang: ILang;
}
