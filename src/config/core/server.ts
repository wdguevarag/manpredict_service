import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import i18n from 'i18n';
import sequelize from '../database/postgres.sequelize';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import { CONFIG } from './environment';
import { i18nConfig } from './lang';
import { container } from '../../api/inversify.config';
import { error500 } from '../middlewares/error.500';
import { error404 } from '../middlewares/error.404';
import { customResponses } from '../middlewares/custom.responses';

export default class Server {
    private static _instance: Server;
    public app: express.Application;
    public port: number;
    private initialize: boolean;
    private endpoints: any;

    constructor() {
        this.port = CONFIG.SERVER.SERVER_PORT;
        this.initialize = false;
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public start(): void {
        if (this.initialize) throw new Error('Server is already running');

        const server: InversifyExpressServer = new InversifyExpressServer(container);
        this.configLang();
        this.configServer(server);

        const url = `http://${CONFIG.SERVER.SERVER_URL}`;
        this.app = server.build();
        this.endpoints = getRouteInfo(container);

        sequelize.authenticate().then(() => {
            console.log('Connection database has been established successfully.');
            this.app.listen(this.port, () => {
                console.info(`Server is running at ${url}:${this.port}`);
                this.initialize = true;
            });
        });
    }

    public getEndpoints(): any {
        console.log(this.endpoints)
        return this.endpoints;
    }

    private configServer(server: InversifyExpressServer): void {
        server.setConfig((app: express.Application) => {
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(bodyParser.json());
            app.use(bodyParser.raw());
            app.use(cors({ origin: true, credentials: true }));
            app.use(customResponses);
            app.use(i18n.init);
        });

        server.setErrorConfig((app: express.Application) => {
            app.all('*', error404);
            app.use(error500);
        });
    }

    private configLang(): void {
        i18n.configure(i18nConfig);
    }
}
