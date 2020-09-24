import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../../config/database/postgres.sequelize';
import Equipo from './Equipment.model';

class FlotaSec extends Model {

    id_flota_sec!: number;
    nombre_flota_sec!: string;
    id_flota_pr!: number;
    tiem_elimin!: Date;

}

FlotaSec.init({
    id_flota_sec: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    nombre_flota_sec: {
        type: new DataTypes.STRING(100),
        allowNull: false,
    },
    id_flota_pr: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tiem_elimin: {
        type: new DataTypes.DATE,
        allowNull: true,
    }



}, {
    schema: 'public',
    tableName: "tp_flota_sec",
    timestamps: false,
    sequelize: sequelize
});

FlotaSec.hasMany(Equipo, {   as: 'equipments' , foreignKey: 'id_flota_sec'});

export default FlotaSec;

