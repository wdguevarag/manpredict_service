import dotenv from 'dotenv';
import _ from 'lodash';

dotenv.config();

const getEnv = (envVariable: string, defaultValue: any) => {
    if (_.isUndefined(envVariable)) {
        return defaultValue;
    }
    return envVariable;
};

export const CONFIG = {
    SERVER: {
        SERVER_URL: getEnv(process.env.URL, '127.0.0.1'),
        SERVER_PORT: getEnv(process.env.PORT, 80),
        NODE_ENV: getEnv(process.env.NODE_ENV, 'development'),
    },

    CONTROL_DB: {
        HOST_DB: getEnv(process.env.HOST_DATABASE, 'dbhost'),
        USER_DB: getEnv(process.env.USER_DATABASE, 'dbuser'),
        PASS_DB: getEnv(process.env.PASS_DATABASE, 'dbpassword'),
        NAME_DB: getEnv(process.env.NAME_DATABASE, 'dbname'),
        PORT_DB: getEnv(process.env.PORT_DATABASE, 'dbport'),
    },

    MAP_CONFIG: {
        UTM_ZONE_NUMBER: getEnv(process.env.UTM_ZONE_NUMBER, 0),
        UTM_ZONE_LETTER: getEnv(process.env.UTM_ZONE_LETTER, ''),
    },

    REMOTE_API: {
        // AM_EQUIPMENT_SERVICE: getEnv(process.env.REMOTEAPI_AM_EQUIPMENT_SERVICE, '127.0.0.1'),
    },

    SOCKET: {
        SOCKET_URL: getEnv(process.env.SOCKET_URL,'127.0.0.1'),
        SOCKET_PORT: getEnv(process.env.SOCKET_PORT,'8200'),
        SOCKET_ID: getEnv(process.env.SOCKET_ID,'healthsense'),
        SOCKET_SERVICE: getEnv(process.env.SOCKET_SERVICE,'messages'),
    }
};
