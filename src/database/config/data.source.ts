import 'dotenv/config'; // 👈 carrega o .env automaticamente

import { SeederOptions } from 'typeorm-extension';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/infrastructure/database/entities/*.ts'], // use string com caminho relativo
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false, // necessário para evitar erro com certificado AWS
  },
};

console.log('Valor: ', process.env.DROP_DATA_WHEN_INITIALIZED === 'true');
const dataSource = new DataSource(AppDataSource);
export default dataSource;
