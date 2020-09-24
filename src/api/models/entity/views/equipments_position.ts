
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';
import schema from '../info/schema';

export class EquipmentsPositonEntityView extends Model {
    equipment_id: number;
    equipment_name: string;
    coorx_local: number;
    coory_local: number;
    coorz_loca: number;
    latitud: number;
    longitud: number;
    last_update: string;
}

EquipmentsPositonEntityView.init(
    {
        equipment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true,
        },
        equipment_name: {
            type: new DataTypes.STRING(100),
        },
        coorx_local: {
            type: DataTypes.INTEGER,
        },
        coory_local: {
            type: DataTypes.INTEGER,
        },
        coorz_loca: {
            type: DataTypes.INTEGER,
        },
        latitud: {
            type: DataTypes.INTEGER,
        },
        longitud: {
            type: DataTypes.INTEGER,
        },
        last_update: {
            type: new DataTypes.STRING(100),
        },
    },
    {
        tableName: 'equipments_position',
        schema: schema,
        timestamps: false,
        sequelize: sequelize,
    }
);