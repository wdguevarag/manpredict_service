import _ from 'lodash';
import { Sequelize } from 'sequelize';
import { CONFIG } from '../core/environment';

const logging = _.toLower(CONFIG.SERVER.NODE_ENV) === 'production' ? null : console.log;

const sequelize = new Sequelize(CONFIG.CONTROL_DB.NAME_DB, CONFIG.CONTROL_DB.USER_DB, CONFIG.CONTROL_DB.PASS_DB, {
    host: CONFIG.CONTROL_DB.HOST_DB,
    dialect: 'postgres',
    dialectOptions: {
        useUTC: true,
    },
    //timezone: '-05:00',
    logging: logging,
});

export default sequelize;
