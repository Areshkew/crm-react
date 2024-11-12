import Sequelize from 'sequelize';
import { ENV } from './const.js';

export const sequelize = new Sequelize(ENV.db, ENV.username, ENV.password, {
  host: ENV.host,
  dialect: 'postgres',
  logging: false
});