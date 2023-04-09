import { Sequelize } from 'sequelize-typescript';
import { User } from './models';

let sequelize: Sequelize;

interface IInitializeDatabase {
  host: string;
  port: string;
  password: string;
  username: string;
  database: string;
}

function initialize({
  host,
  port,
  password,
  username,
  database,
}: IInitializeDatabase) {
  if (sequelize) {
    return sequelize;
  }

  sequelize = new Sequelize({
    database,
    dialect: 'postgres',
    username,
    password,
    port: parseInt(port),
    host,
    models: [User] // or [Player, Team],
  });

  return sequelize;
}

export { sequelize, User, initialize };
