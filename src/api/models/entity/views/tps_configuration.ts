
import { Model, DataTypes, DateDataType } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';
import schema from '../info/schema';

export class TpsConfigurationEntityView extends Model {
    id: number;
    name: string;
    value: string;
}

TpsConfigurationEntityView.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(500),
        },
        value: {
            type: DataTypes.STRING(500),
        },
    },
    {
        tableName: 'configuration_tps',
        schema: schema,
        timestamps: false,
        sequelize: sequelize,
    }
);
