import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';

export default class Client extends Model {

    clientId!: number;
    clientName!: string;
    imgRoute!: string;
    urlRedirect!: string;

}

Client.init({
    clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    clientName: {
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
    tableName: "clients",
    timestamps: false,
    sequelize: sequelize
});


