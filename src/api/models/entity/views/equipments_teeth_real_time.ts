
import { Model, DataTypes, DateDataType } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';
import schema from '../info/schema';

export class EquipmentsTeethRealTimeEntityView extends Model {
    equipment_id: number;
    nameequipment: string;
    fleet_icon: number;
    streaming_url: string;
    abrasion_ratio: number[];
    abrassion_level: number[];
    tooth_size: number[];
    days_passed: number;
    planned_days: number;
}

EquipmentsTeethRealTimeEntityView.init(
    {
        equipment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nameequipment: {
            type: new DataTypes.STRING(250),
        },
        fleet_icon: {
            type: DataTypes.INTEGER,
        },
        streaming_url: {
            type: new DataTypes.STRING(500),
        },
        abrasion_ratio: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        abrassion_level: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        tooth_size: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        days_passed: {
            type: DataTypes.INTEGER,
        },
        planned_days: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'equipments_teeth_real_time',
        schema: schema,
        timestamps: false,
        sequelize: sequelize,
    }
);
