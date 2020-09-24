import { CONFIG } from './environment';

import io from 'socket.io-client';
import feathers, { Application } from '@feathersjs/feathers';
import featherClient from '@feathersjs/client';

const socket = {
    domain: {
        ws: CONFIG.SOCKET.SOCKET_URL,
        port: CONFIG.SOCKET.SOCKET_PORT,
        id: CONFIG.SOCKET.SOCKET_PORT,
    },
    service: CONFIG.SOCKET.SOCKET_SERVICE,
};

export default class Socket {
    /**
     *
     */
    private static _instance: Socket;

    /**
     *
     */
    private id: string;
    private service: string;
    private socket: any;
    private app: Application;

    private constructor() {
        this.id = socket.domain.id;
        this.service = socket.service;
        this.socket = io(`ws://${socket.domain.ws}:${socket.domain.port}`);
        this.app = feathers();
        this.app.configure(featherClient.socketio(this.socket));
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public services() {
        return this.app.service(socket.service);
    }
}
