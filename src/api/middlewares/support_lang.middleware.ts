import express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
import { injectable } from 'inversify';
import { TYPES } from '../types';
import { ILang } from '../../lang/lang';
import { i18nConfig } from '../../config/core/lang';
import _ from 'lodash';

@injectable()
export class SupportLangMiddleware extends BaseMiddleware {
    public handler(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        let lang = req.query.lang;
        if (!_.isNull(lang) && !_.isUndefined(lang)) {
            lang = String(lang).toLocaleLowerCase();
            if (_.includes(i18nConfig.locales, lang)) {
                req.setLocale(lang);
            }
        }

        this.bind<ILang>(TYPES.LANG).toConstantValue(req);
        next();
    }
}
