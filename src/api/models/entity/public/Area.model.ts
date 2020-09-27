import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';

export default class Area extends Model {

    areaId!: number;
    clientId!: number;
    areaName!: string;
    imgRoute!: string;
    urlRedirect!: string;

}

Area.init({
    areaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    clientId: {
        type: DataTypes.INTEGER,
    },
    areaName: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    imgRoute: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    urlRedirect: {
        type: new DataTypes.STRING(),
        allowNull: false,
    },

}, {
    schema: 'public',
    tableName: 'areas',
    timestamps: false,
    sequelize: sequelize,
});


