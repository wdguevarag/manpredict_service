import { Request, Response } from 'express';
import { ApiHttpController } from '../../config/helpers/api_http.controller';
import { httpGet, controller } from 'inversify-express-utils';
import Server from '../../config/core/server';
import _ from 'lodash';
import { TYPES } from '../types';

@controller('', TYPES.MIDDLEWARES.SupportLangMiddleware)
export class EndpointsController extends ApiHttpController {

    @httpGet('/')
    public async index(req: Request, res: Response) {
        let server = Server.instance;
        let endpoints = this.proccessEndpoints(server.getEndpoints());

        return res.ok({ endpoints: endpoints });
    }

    private proccessEndpoints(endpoints: any): any[] {
        let allEndpoints: any[] = [];
        if (_.isArray(endpoints)) {
            _.forEach(endpoints, (ep) => {
                if (_.isArray(ep.endpoints)) {
                    _.forEach(ep.endpoints, (route) => {
                        let split = _.split(route.route, ' ');
                        if (split.length == 2) {
                            allEndpoints.push({
                                method: split[0],
                                route: split[1],
                            });
                        }
                    });
                }
            });
        }
        if (allEndpoints.length > 0) {
            allEndpoints = _.uniqBy(allEndpoints, 'route');
            allEndpoints = _.orderBy(allEndpoints, ['route', 'asc']);
        }
        return allEndpoints;
    }
}
