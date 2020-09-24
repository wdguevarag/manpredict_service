import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';

export default class Equipment extends Model {

    id_equipo!: number;
    nombre_eq!: string;
    id_flota_sec!: number;
    ip_equipo_dir!: string;
    tiem_elimin!: Date;

}

Equipment.init({
    id_equipo: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    nombre_eq: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    id_flota_sec: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    ip_equipo_dir: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    tiem_elimin: {
        type: new DataTypes.DATE,
        allowNull: true,
    }



}, {
    schema: 'public',
    tableName: "tp_equipos",
    timestamps: false,
    sequelize: sequelize
});


