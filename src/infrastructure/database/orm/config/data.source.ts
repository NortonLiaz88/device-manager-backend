import 'dotenv/config'; // 👈 carrega o .env automaticamente

import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/infrastructure/database/entities/**/*.{ts,js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  seeds: ['src/infrastructure/database/orm/seed/**/*.ts'],
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;
