import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ClientModel = sequelize.define('Client', {
    db_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
}, { tableName: 'clients', createdAt: false, updatedAt: false });